namespace BE.Dto
{
    public class TareaGetDto
    {
        public int ID { get; set; }
        public string Descripcion { get; set; } = null!;

        public DateTime FechaHora { get; set; }

        public string Ubicacion { get; set; } = null!;
        public int EventoID { get; set; }
    }
}
