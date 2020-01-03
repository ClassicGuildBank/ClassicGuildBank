using Microsoft.EntityFrameworkCore.Migrations;

namespace ClassicGuildBankData.Migrations
{
    public partial class BagSlotQuantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "BagSlot",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "BagSlot");
        }
    }
}
