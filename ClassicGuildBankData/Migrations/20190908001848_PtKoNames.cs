using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class PtKoNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "KoName",
                table: "Item",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PtName",
                table: "Item",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KoName",
                table: "Item");

            migrationBuilder.DropColumn(
                name: "PtName",
                table: "Item");
        }
    }
}
