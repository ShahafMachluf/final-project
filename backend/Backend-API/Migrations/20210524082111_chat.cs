using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend_API.Migrations
{
    public partial class chat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_FromUsedId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ToUsedId",
                table: "ChatMessages");

            migrationBuilder.RenameColumn(
                name: "ToUsedId",
                table: "ChatMessages",
                newName: "ToUserId");

            migrationBuilder.RenameColumn(
                name: "FromUsedId",
                table: "ChatMessages",
                newName: "FromUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_ToUsedId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_ToUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_FromUsedId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_FromUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_FromUserId",
                table: "ChatMessages",
                column: "FromUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ToUserId",
                table: "ChatMessages",
                column: "ToUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_FromUserId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ToUserId",
                table: "ChatMessages");

            migrationBuilder.RenameColumn(
                name: "ToUserId",
                table: "ChatMessages",
                newName: "ToUsedId");

            migrationBuilder.RenameColumn(
                name: "FromUserId",
                table: "ChatMessages",
                newName: "FromUsedId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_ToUserId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_ToUsedId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_FromUserId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_FromUsedId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_FromUsedId",
                table: "ChatMessages",
                column: "FromUsedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_AspNetUsers_ToUsedId",
                table: "ChatMessages",
                column: "ToUsedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
