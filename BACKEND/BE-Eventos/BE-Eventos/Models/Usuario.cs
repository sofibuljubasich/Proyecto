using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Usuario
{
    public string Correo { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public byte[]? Imagen { get; set; }

    public DateTime? FechaNac { get; set; }

    public string? Localidad { get; set; }

    public string? Dni { get; set; }

    public string? Telefono { get; set; }

    public string? Genero { get; set; }

    public string? ObraSocial { get; set; }


    public virtual Rol Rol { get; set; } = null!;

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual ICollection<Inscripcion> Inscripciones { get; set; } = new List<Inscripcion>();

    public virtual ICollection<Mensaje> MensajeUsuarioEmisor { get; set; } = new List<Mensaje>();

    public virtual ICollection<Mensaje> MensajeUsuarioReceptor { get; set; } = new List<Mensaje>();

    public virtual ICollection<TareaAtendidum> TareasAtendidas { get; set; } = new List<TareaAtendidum>();

    public virtual ICollection<Tarea> Tareas { get; set; } = new List<Tarea>();
}
