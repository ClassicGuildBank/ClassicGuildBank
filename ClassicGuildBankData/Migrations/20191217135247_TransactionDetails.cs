using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class TransactionDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_Item_ItemId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ItemId",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Transaction");

            migrationBuilder.CreateTable(
                name: "TransactionDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ItemId = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    TransactionId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionDetail_Item_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Item",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_TransactionDetail_Transaction_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transaction",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDetail_ItemId",
                table: "TransactionDetail",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDetail_TransactionId",
                table: "TransactionDetail",
                column: "TransactionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TransactionDetail");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Transaction",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Transaction",
                nullable: true);

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
    }
}
