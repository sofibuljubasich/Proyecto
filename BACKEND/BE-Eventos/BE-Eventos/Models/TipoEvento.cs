using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class TipoEvento
{
    public int Codigo { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Evento> Eventos { get; set; } = new List<Evento>();
}
