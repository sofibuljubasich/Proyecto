using AutoMapper.Execution;
using Microsoft.AspNetCore.Mvc;

namespace BE.Dto
{
    public class EventoFiltrosDto
    {
        public string? Busqueda { get;set; }    

        public DateTime? FechaInicio {get; set; }

        public DateTime? FechaFin {get; set; }      

        public string? Tipo { get; set; }    




    }
}
