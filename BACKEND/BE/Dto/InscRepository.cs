﻿using BE.Models;

namespace BE.Dto
{
    public class InscRepository
    {
        public string NombreEvento { get; set; }
        public string Imagen { get; set; }
        public string Tipo { get; set; }
        public DateTime Fecha { get; set; }

        public TimeSpan Hora { get; set; }
        public string LugarEvento { get; set; }
        public EventoDistanciaDto Distancia { get; set; }
        public int CategoriaID { get; set; }

    }
}
