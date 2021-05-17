using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend_API.Migrations
{
    public partial class attraction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Attractions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attractions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Attractions",
                columns: new[] { "Id", "Address", "ImageURL", "Latitude", "Longitude", "Name" },
                values: new object[,]
                {
                    { 1, "יפת, קדם, תל אביב יפו", "https://lh5.googleusercontent.com/p/AF1QipMhf6Z16ZIfaq2XwW-hSZCOjndODw_Nnn_6-Hs=w408-h304-k-no", 32.039332389353092, 34.745416855801309, "חוף עליה תל אביב יפו" },
                    { 2, "טיילת שלמה להט, תל אביב יפו", "https://lh5.googleusercontent.com/p/AF1QipM3-k-Cx-grQzaczPPEGdDBbx7ErjzihT8yUdud=w408-h306-k-no", 32.093060412683101, 34.770929383805104, "חוף הכלבים" },
                    { 3, "שביל ישראל, תל אביב יפו", "https://lh5.googleusercontent.com/p/AF1QipPeRLFHW8modnyo7mN4AD6XEDgDieF4CIzJmMQ4=w408-h306-k-no", 32.116458689969946, 34.779863188779913, "חוף הכלבים הצפוני - תל ברוך" },
                    { 4, "תל אביב יפו", "https://lh5.googleusercontent.com/p/AF1QipOXwbXKGAlscGmDZ_0n6z_fgdcfUsxP6FpTV-dS=w408-h306-k-no", 32.144486238831021, 34.790942155733418, "חוף הצוק הצפוני" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attractions");
        }
    }
}
