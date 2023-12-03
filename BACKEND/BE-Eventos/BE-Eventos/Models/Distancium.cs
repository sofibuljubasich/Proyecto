using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Distancium
{
    public int Codigo { get; set; }

    public int Km { get; set; }

    public virtual ICollection<DistanciaEvento> DistanciaEventos { get; set; } = new List<DistanciaEvento>();

    public virtual ICollection<Inscripcion> Inscripcions { get; set; } = new List<Inscripcion>();
}
