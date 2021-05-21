using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend_API.Migrations
{
    public partial class chat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DogOwnerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    AdopterId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DogId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_AdopterId",
                        column: x => x.AdopterId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_DogOwnerId",
                        column: x => x.DogOwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chats_Dogs_DogId",
                        column: x => x.DogId,
                        principalTable: "Dogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FromUsedId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ToUsedId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ChatId = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatMessages_AspNetUsers_FromUsedId",
                        column: x => x.FromUsedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatMessages_AspNetUsers_ToUsedId",
                        column: x => x.ToUsedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatMessages_Chats_ChatId",
                        column: x => x.ChatId,
                        principalTable: "Chats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_ChatId",
                table: "ChatMessages",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_FromUsedId",
                table: "ChatMessages",
                column: "FromUsedId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_ToUsedId",
                table: "ChatMessages",
                column: "ToUsedId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_AdopterId",
                table: "Chats",
                column: "AdopterId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_DogId",
                table: "Chats",
                column: "DogId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_DogOwnerId",
                table: "Chats",
                column: "DogOwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "Chats");
        }
    }
}
