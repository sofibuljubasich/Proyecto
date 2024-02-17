using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BE.Migrations
{
    /// <inheritdoc />
    public partial class newtypeusers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tareas_Usuarios_UsuarioID",
                table: "Tareas");

            migrationBuilder.RenameColumn(
                name: "UsuarioID",
                table: "Tareas",
                newName: "EventoID");

            migrationBuilder.RenameIndex(
                name: "IX_Tareas_UsuarioID",
                table: "Tareas",
                newName: "IX_Tareas_EventoID");

            migrationBuilder.AlterColumn<string>(
                name: "ObraSocial",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Localidad",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Genero",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Dni",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "TareaVoluntario",
                columns: table => new
                {
                    TareasID = table.Column<int>(type: "int", nullable: false),
                    VoluntariosID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TareaVoluntario", x => new { x.TareasID, x.VoluntariosID });
                    table.ForeignKey(
                        name: "FK_TareaVoluntario_Tareas_TareasID",
                        column: x => x.TareasID,
                        principalTable: "Tareas",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TareaVoluntario_Usuarios_VoluntariosID",
                        column: x => x.VoluntariosID,
                        principalTable: "Usuarios",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TareaVoluntario_VoluntariosID",
                table: "TareaVoluntario",
                column: "VoluntariosID");

            migrationBuilder.AddForeignKey(
                name: "FK_Tareas_Eventos_EventoID",
                table: "Tareas",
                column: "EventoID",
                principalTable: "Eventos",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tareas_Eventos_EventoID",
                table: "Tareas");

            migrationBuilder.DropTable(
                name: "TareaVoluntario");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Usuarios");

            migrationBuilder.RenameColumn(
                name: "EventoID",
                table: "Tareas",
                newName: "UsuarioID");

            migrationBuilder.RenameIndex(
                name: "IX_Tareas_EventoID",
                table: "Tareas",
                newName: "IX_Tareas_UsuarioID");

            migrationBuilder.AlterColumn<string>(
                name: "ObraSocial",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Localidad",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Genero",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Dni",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tareas_Usuarios_UsuarioID",
                table: "Tareas",
                column: "UsuarioID",
                principalTable: "Usuarios",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
