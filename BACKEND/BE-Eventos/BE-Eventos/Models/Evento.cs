using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Evento
{
    public int Idevento { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public string Lugar { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public byte[]? Imagen { get; set; }

    public string? Requisitos { get; set; }

    public int IdTipo { get; set; }

    public virtual ICollection<CategoriaEvento> CategoriaEventos { get; set; } = new List<CategoriaEvento>();

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<DistanciaEvento> DistanciaEventos { get; set; } = new List<DistanciaEvento>();

    public virtual TipoEvento IdTipoNavigation { get; set; } = null!;

    public virtual ICollection<Inscripcion> Inscripcions { get; set; } = new List<Inscripcion>();
}
