using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class TareaAtendidum
{
    public string CorreoVoluntario { get; set; } = null!;

    public int CodTarea { get; set; }

    public string Estado { get; set; } = null!;

    public string? Comentarios { get; set; }

    public virtual Tarea CodTareaNavigation { get; set; } = null!;

    public virtual Usuario CorreoVoluntarioNavigation { get; set; } = null!;
}
