using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class transaction2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ItemId",
                table: "Transaction",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_Item_ItemId",
                table: "Transaction",
                column: "ItemId",
                principalTable: "Item",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Item_ItemId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ItemId",
                table: "Transaction");
        }
    }
}
