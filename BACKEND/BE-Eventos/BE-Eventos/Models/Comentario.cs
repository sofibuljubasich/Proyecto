using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Comentario
{
    public string CorreoCorredor { get; set; } = null!;

    public int IdEvento { get; set; }

    public DateTime FechaHora { get; set; }

    public string Contenido { get; set; } = null!;

    public virtual Usuario CorreoCorredorNavigation { get; set; } = null!;

    public virtual Evento IdEventoNavigation { get; set; } = null!;
}
