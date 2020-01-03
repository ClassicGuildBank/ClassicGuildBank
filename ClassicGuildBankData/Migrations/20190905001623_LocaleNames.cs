using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class LocaleNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CnName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DeName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EsName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FrName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RuName",
                table: "Item",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CnName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "DeName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "EsName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "FrName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "ItName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "RuName",
                table: "Item");
        }
    }
}
