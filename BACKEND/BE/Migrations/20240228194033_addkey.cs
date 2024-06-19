using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class addkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DistanciaEvento");

            migrationBuilder.CreateTable(
                name: "EventoDistancia",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventoID = table.Column<int>(type: "int", nullable: false),
                    DistanciaID = table.Column<int>(type: "int", nullable: false),
                    Precio = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventoDistancia", x => x.ID);
                    table.ForeignKey(
                        name: "FK_EventoDistancia_Distancias_DistanciaID",
                        column: x => x.DistanciaID,
                        principalTable: "Distancias",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventoDistancia_Eventos_EventoID",
                        column: x => x.EventoID,
                        principalTable: "Eventos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventoDistancia_DistanciaID",
                table: "EventoDistancia",
                column: "DistanciaID");

            migrationBuilder.CreateIndex(
                name: "IX_EventoDistancia_EventoID",
                table: "EventoDistancia",
                column: "EventoID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventoDistancia");

            migrationBuilder.CreateTable(
                name: "DistanciaEvento",
                columns: table => new
                {
                    DistanciasID = table.Column<int>(type: "int", nullable: false),
                    EventosID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistanciaEvento", x => new { x.DistanciasID, x.EventosID });
                    table.ForeignKey(
                        name: "FK_DistanciaEvento_Distancias_DistanciasID",
                        column: x => x.DistanciasID,
                        principalTable: "Distancias",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DistanciaEvento_Eventos_EventosID",
                        column: x => x.EventosID,
                        principalTable: "Eventos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DistanciaEvento_EventosID",
                table: "DistanciaEvento",
                column: "EventosID");
        }
    }
}
