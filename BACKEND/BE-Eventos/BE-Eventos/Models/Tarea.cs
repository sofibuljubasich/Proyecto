using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Tarea
{
    public int CodTarea { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaHora { get; set; }

    public string Ubicacion { get; set; } = null!;

    public string CorreoOrg { get; set; } = null!;

    public virtual Usuario CorreoOrgNavigation { get; set; } = null!;

    public virtual ICollection<TareaAtendidum> TareaAtendida { get; set; } = new List<TareaAtendidum>();
}
