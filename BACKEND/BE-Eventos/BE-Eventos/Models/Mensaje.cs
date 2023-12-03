using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Mensaje
{
    public string UsuarioEmisor { get; set; } = null!;

    public string UsuarioReceptor { get; set; } = null!;


    public DateTime FechaHora { get; set; }

    public string Contenido { get; set; } = null!;

    public virtual Usuario UsuariosEmisores { get; set; } = null!;

    public virtual Usuario UsuariosReceptores { get; set; } = null!;
}
