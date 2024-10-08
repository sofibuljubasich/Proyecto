﻿using BE.Models;
using System.ComponentModel.DataAnnotations;

namespace BE.Dto
{
    public class EventoDto
    {
        public int ID { get; set; }

        public string Nombre { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime Fecha { get; set; }
      //public TimeOnly Hora { get; set; }
        public TimeSpan Hora { get; set; }
        public string Lugar { get; set; }

        public string Estado { get; set; }

//        public byte[]? Imagen { get; set; }
        public string? Imagen { get; set; }



        public TipoEventoDto Tipo { get; set; }

    }
}
