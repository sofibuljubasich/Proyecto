using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class DistanciaEvento
{
    public int IdEvento { get; set; }

    public int CodDistancia { get; set; }

    public decimal Costo { get; set; }

    public int Cantidad { get; set; }

    public virtual Distancium CodDistanciaNavigation { get; set; } = null!;

    public virtual Evento IdEventoNavigation { get; set; } = null!;
}
