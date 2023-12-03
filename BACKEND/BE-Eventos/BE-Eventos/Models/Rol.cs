using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Rol
{
    public int Codigo { get; set; }

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
