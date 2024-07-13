using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class CamposInscr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Posicion",
                table: "Inscripciones",
                newName: "PosicionGeneral");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaID",
                table: "Inscripciones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PosicionCategoria",
                table: "Inscripciones",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Precio",
                table: "Inscripciones",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoriaID",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "PosicionCategoria",
                table: "Inscripciones");

            migrationBuilder.DropColumn(
                name: "Precio",
                table: "Inscripciones");

            migrationBuilder.RenameColumn(
                name: "PosicionGeneral",
                table: "Inscripciones",
                newName: "Posicion");
        }
    }
}
