using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class itemrequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ItemRequest",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CharacterName = table.Column<string>(nullable: true),
                    Gold = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    Reason = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    GuildId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequest_Guild_GuildId",
                        column: x => x.GuildId,
                        principalTable: "Guild",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemRequestDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ItemId = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    ItemRequestId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequestDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequestDetail_Item_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_ItemRequestDetail_ItemRequest_ItemRequestId",
                        column: x => x.ItemRequestId,
                        principalTable: "ItemRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequest_GuildId",
                table: "ItemRequest",
                column: "GuildId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequestDetail_ItemId",
                table: "ItemRequestDetail",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequestDetail_ItemRequestId",
                table: "ItemRequestDetail",
                column: "ItemRequestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemRequestDetail");

            migrationBuilder.DropTable(
                name: "ItemRequest");
        }
    }
}
