using BE.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Dto
{
    public class TareaVoluntarioComentarioDto
    {


            [ForeignKey("Tarea")]
            public int TareaID { get; set; }
            

            [ForeignKey("Voluntario")]
            public int VoluntarioID { get; set; }
         

            public string Comentario { get; set; }
        }


    
}
