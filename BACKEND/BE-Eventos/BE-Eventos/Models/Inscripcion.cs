using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Inscripcion
{
    public int IdEvento { get; set; }

    public string Correo { get; set; } = null!;

    public int CodDistancia { get; set; }

    public DateTime Fecha { get; set; }

    public int Dorsal { get; set; }

    public string TalleRemera { get; set; } = null!;

    public string FormaPago { get; set; } = null!;

    public string EstadoPago { get; set; } = null!;

    public string? Posicion { get; set; }

    public int? Tiempo { get; set; }

    public virtual Distancium CodDistanciaNavigation { get; set; } = null!;

    public virtual Usuario CorreoNavigation { get; set; } = null!;

    public virtual Evento IdEventoNavigation { get; set; } = null!;
}
