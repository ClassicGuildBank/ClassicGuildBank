using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class guildmember : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GuildRole",
                table: "GuildRole");

            migrationBuilder.DropIndex(
                name: "IX_GuildRole_GuildId",
                table: "GuildRole");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "GuildRole");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "GuildRole",
                newName: "DisplayName");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "GuildRole",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_GuildRole",
                table: "GuildRole",
                columns: new[] { "GuildId", "UserId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_GuildRole",
                table: "GuildRole");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "GuildRole",
                newName: "Role");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "GuildRole",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "GuildRole",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_GuildRole",
                table: "GuildRole",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_GuildRole_GuildId",
                table: "GuildRole",
                column: "GuildId");
        }
    }
}
