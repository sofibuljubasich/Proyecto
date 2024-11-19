using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
public class TareaEstadoDto
{
    public int ID { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaHora { get; set; }

    public string Ubicacion { get; set; } = null!;
        //public virtual ICollection<Voluntario> Voluntarios { get; set; }

  
    public virtual ICollection<TareaVoluntarioDto> TareaVoluntarios { get; set; }
}}