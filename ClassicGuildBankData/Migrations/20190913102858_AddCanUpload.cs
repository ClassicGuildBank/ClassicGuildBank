using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class AddCanUpload : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanUpload",
                table: "GuildRole",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanUpload",
                table: "GuildRole");
        }
    }
}
