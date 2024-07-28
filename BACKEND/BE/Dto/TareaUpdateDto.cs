namespace BE.Dto
{
    public class TareaUpdateDto
    {
       
            public string Descripcion { get; set; } = null!;

            public DateTime FechaHora { get; set; }

            public string Ubicacion { get; set; } = null!;



            public int EventoID { get; set; }
        }
    }


