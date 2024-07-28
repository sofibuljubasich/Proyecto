using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class tareaVoluntarioEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TareaVoluntario",
                columns: table => new
                {
                    TareaID = table.Column<int>(nullable: false),
                    VoluntarioID = table.Column<int>(nullable: false),
                    Estado = table.Column<string>(nullable: false),
                    Comentario = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TareaVoluntario", x => new { x.TareaID, x.VoluntarioID });
                    table.ForeignKey(
                        name: "FK_TareaVoluntario_Tarea_TareaID",
                        column: x => x.TareaID,
                        principalTable: "Tareas",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TareaVoluntario_Voluntario_VoluntarioID",
                        column: x => x.VoluntarioID,
                        principalTable: "Usuarios",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TareaVoluntario");
        }
    }
}
