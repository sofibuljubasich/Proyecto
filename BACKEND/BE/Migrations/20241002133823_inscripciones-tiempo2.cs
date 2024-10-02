using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class inscripcionestiempo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
               name: "Tiempo",
               table: "Inscripciones",
               type: "nvarchar(max)",
               nullable: true,
               oldClrType: typeof(int),
               oldType: "int",
               oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
    name: "Tiempo",
    table: "Inscripciones",
    type: "int",
    nullable: true,
    oldClrType: typeof(string),
    oldType: "nvarchar(max)",
    oldNullable: true);
        }
    }
}
