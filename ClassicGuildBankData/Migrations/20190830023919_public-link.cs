using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class publiclink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PublicLinkEnabled",
                table: "Guild",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PublicUrl",
                table: "Guild",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Gold",
                table: "Character",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicLinkEnabled",
                table: "Guild");

            migrationBuilder.DropColumn(
                name: "PublicUrl",
                table: "Guild");

            migrationBuilder.DropColumn(
                name: "Gold",
                table: "Character");
        }
    }
}
