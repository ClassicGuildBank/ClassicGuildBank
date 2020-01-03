using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class PatreonUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PatreonAccessToken",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PatreonExpiration",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PatreonRefreshToken",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Patreon_Id",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PatreonAccessToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PatreonExpiration",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PatreonRefreshToken",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Patreon_Id",
                table: "AspNetUsers");
        }
    }
}
