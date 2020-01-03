using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class Bag_Item_Relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bag_ItemId",
                table: "Bag");

            migrationBuilder.CreateIndex(
                name: "IX_Bag_ItemId",
                table: "Bag",
                column: "ItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bag_ItemId",
                table: "Bag");

            migrationBuilder.CreateIndex(
                name: "IX_Bag_ItemId",
                table: "Bag",
                column: "ItemId",
                unique: true,
                filter: "[ItemId] IS NOT NULL");
        }
    }
}
