using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend_API.Migrations
{
    public partial class distance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxDistance",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxDistance",
                table: "AspNetUsers");
        }
    }
}
