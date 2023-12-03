using System;
using System.Collections.Generic;

namespace BE_Eventos.Models;

public partial class CategoriaEvento
{
    public int IdEvento { get; set; }

    public int CodCategoria { get; set; }

    public int Cantidad { get; set; }

    public virtual Categorium CodCategoriaNavigation { get; set; } = null!;

    public virtual Evento IdEventoNavigation { get; set; } = null!;
}
