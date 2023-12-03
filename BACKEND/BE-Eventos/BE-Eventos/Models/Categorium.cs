using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class Categorium
{
    public int Idcategoria { get; set; }

    public int EdadInicio { get; set; }

    public int EdadFin { get; set; }

    public virtual ICollection<CategoriaEvento> CategoriaEventos { get; set; } = new List<CategoriaEvento>();
}
