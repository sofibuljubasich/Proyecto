using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class modifyeventsdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Eventos_Categorias_CategoriaID",
                table: "Eventos");

            migrationBuilder.DropIndex(
                name: "IX_Eventos_CategoriaID",
                table: "Eventos");

            migrationBuilder.DropColumn(
                name: "CategoriaID",
                table: "Eventos");

            migrationBuilder.AlterColumn<string>(
                name: "Remera",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FormaPago",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EstadoPago",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "CategoriaEvento",
                columns: table => new
                {
                    CategoriasID = table.Column<int>(type: "int", nullable: false),
                    EventosID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaEvento", x => new { x.CategoriasID, x.EventosID });
                    table.ForeignKey(
                        name: "FK_CategoriaEvento_Categorias_CategoriasID",
                        column: x => x.CategoriasID,
                        principalTable: "Categorias",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoriaEvento_Eventos_EventosID",
                        column: x => x.EventosID,
                        principalTable: "Eventos",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoriaEvento_EventosID",
                table: "CategoriaEvento",
                column: "EventosID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoriaEvento");

            migrationBuilder.AlterColumn<string>(
                name: "Remera",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FormaPago",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EstadoPago",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoriaID",
                table: "Eventos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_CategoriaID",
                table: "Eventos",
                column: "CategoriaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Eventos_Categorias_CategoriaID",
                table: "Eventos",
                column: "CategoriaID",
                principalTable: "Categorias",
                principalColumn: "ID");
        }
    }
}
