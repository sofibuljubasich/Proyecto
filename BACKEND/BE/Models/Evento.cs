using Azure;
using BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Evento
    {
        public int ID { get; set; }

        public string Nombre { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }

        public string Lugar { get; set; } 

        public string Estado { get; set; } 

        public byte[]? Imagen { get; set; }


        public ICollection<Categoria> Categorias { get; set; }


        public virtual ICollection<EventoDistancia> EventoDistancias { get; set; }



        public virtual ICollection<Comentario> Comentarios { get; set; } 


        public virtual ICollection<Inscripcion> Inscripciones { get; set; } 

        public virtual TipoEvento Tipo { get; set; }
        [ForeignKey("Tipo")]
        public int TipoID { get; set; }
    }
}