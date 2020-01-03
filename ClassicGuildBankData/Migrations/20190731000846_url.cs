using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class url : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InviteUrl",
                table: "Guild",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InviteUrl",
                table: "Guild");
        }
    }
}
