terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.0.2"
    }
  }

  backend "azurerm" {
    storage_account_name = "kmxterraformbackend"
    container_name       = "terraform"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

locals {
  resource_group_location = var.resource_group_location
  sql_admin_password      = var.sql_admin_password
  dns_name                = "classicguildbank.thielking.dev"
  # IP Addresses allowed to access Sql Server
  allowed_ips = [
    {
      start = "23.28.20.0"
      end   = "23.28.20.255"
    }
  ]
}

# Create the resource group to hold everything
resource "azurerm_resource_group" "rg" {
  name     = "ClassicGuildBank"
  location = local.resource_group_location
}

# Create SQL Server
resource "azurerm_mssql_server" "db_server" {
  name                         = lower("${azurerm_resource_group.rg.name}-sql")
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = "terraformadmin"
  administrator_login_password = local.sql_admin_password
  azuread_administrator {
    login_username = "athielking@gmail.com"
    object_id      = "3a4f0f5d-65fa-48cf-a1cc-9e62d351b76a"
  }
}

# Create a firewall rule to allow azure resources to access the SQL Server
resource "azurerm_mssql_firewall_rule" "db_allow_azure" {
  name             = "AllowAzureResources"
  server_id        = azurerm_mssql_server.db_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Create a firewall rule to allow local access to sql
resource "azurerm_mssql_firewall_rule" "allow_ip_block" {
  count            = length(local.allowed_ips)
  name             = "Allow ${local.allowed_ips[count.index].start}"
  server_id        = azurerm_mssql_server.db_server.id
  start_ip_address = local.allowed_ips[count.index].start
  end_ip_address   = local.allowed_ips[count.index].end
}

# Create the SQL Database
resource "azurerm_mssql_database" "db" {
  name      = "${azurerm_resource_group.rg.name}-db"
  server_id = azurerm_mssql_server.db_server.id
  sku_name  = "Basic"
}

# Create the Azure App Service Plan
resource "azurerm_service_plan" "app_sp" {
  name                = "${azurerm_resource_group.rg.name}-sp"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Windows"
  sku_name            = "B1"
}

# Create the Azure Web App
resource "azurerm_windows_web_app" "app_svc" {
  name                = "${azurerm_resource_group.rg.name}-api"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.app_sp.id

  connection_string {
    name  = "ClassicGuildBankDb"
    type  = "SQLServer"
    value = "Server=${azurerm_mssql_server.db_server.fully_qualified_domain_name};Initial Catalog=${azurerm_mssql_database.db.name};User ID=terraformadmin;Password=${local.sql_admin_password}"
  }

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE = "1"
    ASPNETCORE_ENVIRONMENT   = "Production"
    ClientUrl                = "https://${local.dns_name}/#"
  }

  site_config {
    cors {
      allowed_origins = [
        "https://${local.dns_name}"
      ]
      support_credentials = true
    }

    application_stack {
      current_stack  = "dotnet"
      dotnet_version = "v6.0"
    }
  }
}

# Create a storage account for the static website
resource "azurerm_storage_account" "storage" {
  name                     = lower("${azurerm_resource_group.rg.name}storage")
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_kind             = "StorageV2"
  account_tier             = "Standard"
  account_replication_type = "GRS"

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

# Setup the CDN Profile and Endpoint to point to the storage account
resource "azurerm_cdn_profile" "cdnp" {
  name                = "${azurerm_resource_group.rg.name}-cdnp"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard_Microsoft"
}

# CDN Endpoint points to storage container with SPA Deployed to it
resource "azurerm_cdn_endpoint" "cdne" {
  name                = "${azurerm_resource_group.rg.name}-cdne"
  profile_name        = azurerm_cdn_profile.cdnp.name
  location            = azurerm_cdn_profile.cdnp.location
  resource_group_name = azurerm_resource_group.rg.name

  origin {
    name      = azurerm_storage_account.storage.name
    host_name = azurerm_storage_account.storage.primary_web_host
  }
}

# Import existing DNS Zone as Data.  This is not managed by this terraform deployment
data "azurerm_dns_zone" "dns" {
  name                = "thielking.dev"
  resource_group_name = "TerraformPrereqs"
}

# Create a DNS record to point to our CDN Enpoint
resource "azurerm_dns_cname_record" "cname" {
  name                = lower(azurerm_resource_group.rg.name)
  zone_name           = data.azurerm_dns_zone.dns.name
  resource_group_name = data.azurerm_dns_zone.dns.resource_group_name
  ttl                 = 3600
  target_resource_id  = azurerm_cdn_endpoint.cdne.id
}

# Add our custom domain to the CDN Enpoint
resource "azurerm_cdn_endpoint_custom_domain" "domain" {
  name            = lower(azurerm_resource_group.rg.name)
  cdn_endpoint_id = azurerm_cdn_endpoint.cdne.id
  host_name       = "${lower(azurerm_resource_group.rg.name)}.${data.azurerm_dns_zone.dns.name}"

  # Terraform was requiring a field which was only applicable to user managed certificates
  # Instead of using Terraform we can use a provisioner to execute an Azure CLI command
  # after the resource has been provisioned to modify attributes on it such as enable HTTPS
  provisioner "local-exec" {
	command = "az cdn custom-domain enable-https --resource-group ${azurerm_resource_group.rg.name} --name ${lower(azurerm_resource_group.rg.name)} --endpoint-name ${azurerm_cdn_endpoint.cdne.name} --profile ${azurerm_cdn_profile.cdnp.name}"
  }

  depends_on = [
	azurerm_dns_cname_record.cname,
  ]
}
