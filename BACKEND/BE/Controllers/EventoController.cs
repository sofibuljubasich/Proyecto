﻿using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Azure.Core;
using BE.Services;
using NETCore.MailKit.Core;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ExcelDataReader;
using System.Diagnostics.Contracts;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using ClosedXML;
using ClosedXML.Excel;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IEventoRepository _eventoRepository;
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly IDistanciaRepository _distanciaRepository;
        private readonly IEventoDistanciaRepository _eventoDistanciaRepository;
        private readonly ICorredorRepository _corredorRepository;
        private readonly ITipoEventoRepository _tipoRepository;
        private readonly Services.IEmailService _emailService;
        public EventoController(IMapper mapper, IEventoRepository eventoRepository, ICategoriaRepository categoriaRepository, IDistanciaRepository distanciaRepository,
                IEventoDistanciaRepository eventoDistanciaRepository, ICorredorRepository corredorRepository, ITipoEventoRepository tipoRepository, Services.IEmailService emailService)
        {
            _mapper = mapper;
            _eventoRepository = eventoRepository;
            _categoriaRepository = categoriaRepository;
            _distanciaRepository = distanciaRepository;
            _eventoDistanciaRepository = eventoDistanciaRepository;
            _corredorRepository = corredorRepository;
            _tipoRepository = tipoRepository;
            _emailService = emailService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listEventos = await _eventoRepository.GetEventos();

                // var listEventosDto = _mapper.Map<IEnumerable<EventoDto>>(listEventos);


                var eventosRtaDto = new List<EventoRespuestaDto>();

                //foreach (var evento in listEventosDto) 
                foreach (var evento in listEventos)

                {

                    EventoDto eventoDto = _mapper.Map<EventoDto>(evento);

                    var tipo = await _tipoRepository.GetTipoEvento(evento.TipoID);
                    var tipoDto = _mapper.Map<TipoEventoDto>(tipo);

                    eventoDto.Tipo = tipoDto;

                    var categorias = await _categoriaRepository.GetCategoriasByEvento(evento.ID);
                    var distancias = await _eventoDistanciaRepository.GetDistanciasByEvento(evento.ID);

                    var categoriasDto = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);
                    //var distanciasDto = _mapper.Map<IEnumerable<EventoDistanciaDto>>(distancias);

                    var distanciasDto = new List<EventoDistanciaDto>();
                    foreach (var distancia in distancias)
                    {
                        var dist = new EventoDistanciaDto
                        {
                            ID = distancia.ID,
                            DistanciaID = distancia.Distancia.ID,
                            KM = distancia.Distancia.KM,
                            Precio = distancia.Precio

                        };
                        distanciasDto.Add(dist);
                    }

                    var eventoRta = new EventoRespuestaDto
                    {
                        Evento = eventoDto,
                        Distancias = distanciasDto,
                        Categorias = categoriasDto

                    };

                    eventosRtaDto.Add(eventoRta);

                }


                return Ok(eventosRtaDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{eventoID}")]
        public async Task<IActionResult> Get(int eventoID)
        {
            try
            {
                var evento = await _eventoRepository.GetEvento(eventoID);

                var eventoDto = _mapper.Map<EventoDto>(evento);

                if (evento == null)
                {
                    return NotFound();
                }

                var tipo = await _tipoRepository.GetTipoEvento(evento.TipoID);
                var tipoDto = _mapper.Map<TipoEventoDto>(tipo);

                eventoDto.Tipo = tipoDto;

                var categorias = await _categoriaRepository.GetCategoriasByEvento(evento.ID);

                var categoriasDto = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);

                var distancias = await _eventoDistanciaRepository.GetDistanciasByEvento(evento.ID);
                var distanciasDto = new List<EventoDistanciaDto>();
                foreach (var distancia in distancias)
                {
                    var dist = new EventoDistanciaDto
                    {
                        ID = distancia.ID,
                        DistanciaID = distancia.Distancia.ID,
                        KM = distancia.Distancia.KM,
                        Precio = distancia.Precio

                    };
                    distanciasDto.Add(dist);
                }



                var respuestaDto = new EventoRespuestaDto
                {
                    Evento = eventoDto,
                    Categorias = categoriasDto,
                    Distancias = distanciasDto
                };




                return Ok(respuestaDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //Por rol
        //[Route("inscriptos")]
        [HttpGet, Route("inscriptos/{eventoID}")]
        public async Task<IActionResult> GetInscripciones(int eventoID)
        {
            try
            {
                var listInscrips = await _eventoRepository.GetInscripcionesByEvento(eventoID);

                //var listEventosDto = _mapper.Map<IEnumerable<EventoDto>>(listEventos);

                var inscripciones = new List<InscripcionDto>();
                foreach (var inscripcion in listInscrips)
                {
                    //buscar corredor y distancia 
                    Distancia distancia = await _distanciaRepository.GetDistancia(inscripcion.DistanciaID);
                    DistanciaDto distanciaDto = _mapper.Map<DistanciaDto>(distancia);

                    Corredor corredor = await _corredorRepository.GetCorredor(inscripcion.UsuarioID);
                    CorredorGetDto corredorDto = _mapper.Map<CorredorGetDto>(corredor);

                    //Calculo la categoria porque año a año cambia según la edad
                    DateTime FechaNacimiento = (DateTime)corredor.FechaNacimiento;

                    var edad = DateTime.Now.Year - FechaNacimiento.Year;

                    Categoria categoria = await _categoriaRepository.CalculateCategory(edad);


                    var insc = new InscripcionDto
                    {
                        ID = inscripcion.ID,
                        Fecha = inscripcion.Fecha,

                        Corredor = corredorDto,
                        Distancia = distanciaDto,
                        Remera = inscripcion.Remera,
                        FormaPago = inscripcion.FormaPago,
                        EstadoPago = inscripcion.EstadoPago,
                        Categoria = categoria,
                        Dorsal = inscripcion.Dorsal,
                        Acreditado = inscripcion.Acreditado



                    };

                    inscripciones.Add(insc);
                }


                return Ok(inscripciones);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        //Por Rol
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var eventodto = await _eventoRepository.GetEvento(id);

                if (eventodto == null)
                {
                    return NotFound();
                }

                var evento =
                  _mapper.Map<Evento>(eventodto);

                await _eventoRepository.Delete(evento);

                return Ok("Evento Eliminado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Por Rol
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] EventoCreateDto eventoDto)
        {
            try
            {
                var distancias = eventoDto.EventoDistancias;

                string ImagenURL;

                if (eventoDto.Imagen != null && eventoDto.Imagen.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(eventoDto.Imagen.FileName);
                    var path = Path.Combine("wwwroot/imagenes/events", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await eventoDto.Imagen.CopyToAsync(stream);
                    }

                    ImagenURL = "/Imagenes/events/" + fileName;
                }
                else
                {
                    // Asignar una imagen por defecto
                    ImagenURL = "/Imagenes/events/event-empty.jpg";
                }




                var newEvento = new Evento()
                {
                    Nombre = eventoDto.Nombre,
                    Lugar = eventoDto.Lugar,
                    Fecha = eventoDto.Fecha,
                    Imagen = ImagenURL,
                    Estado = "Activo",
                    TipoID = eventoDto.TipoID,
                    Categorias = eventoDto.Categorias


                };
                //var evento = _mapper.Map<Evento>(eventoDto);



                newEvento = await _eventoRepository.Create(newEvento);

                // CREAR EVENTO-DISTANCIA-PRECIO
                foreach (var eventoDistancia in distancias)
                {
                    var newDistancia = await _distanciaRepository.GetDistancia(eventoDistancia.DistanciaID);

                    var newEventoDistancia = new EventoDistancia()
                    {
                        EventoID = newEvento.ID,
                        Distancia = newDistancia,
                        Precio = eventoDistancia.Precio

                    };
                    await _eventoDistanciaRepository.Create(newEventoDistancia);


                }

                //EVENTO CATEGORIA



                return Ok("Evento creado");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Por Rol
        //ACOMODAR
        [HttpPut("{eventoID}")]

        public async Task<IActionResult> Update(int eventoID, EventoUpdateDto eventoDto)
        {
            try
            {


                var edlist = _mapper.Map<ICollection<EventoDistancia>>(eventoDto.EventoDistancias);

                await _eventoRepository.Update(eventoID, eventoDto);

                //Actualiza evento-distancia
                await _eventoDistanciaRepository.Update(eventoID, edlist);
                return Ok("Evento actualizado");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("resultados/{eventoID}")]
        public async Task<IActionResult> GetResultados(int eventoID)
        {
            try
            {
                var evento = await _eventoRepository.GetEvento(eventoID);

                if (evento.Estado == "Activo")
                {
                    return BadRequest("Evento No Finalizado ");
                }
                var listResultados = await _eventoRepository.GetResultados(eventoID);

                var listResultadosDto = new List<ResultadoDto>();
                foreach (var resultado in listResultados)
                {
                    var categoria = await _categoriaRepository.GetCategoria(resultado.CategoriaID);
                    var resultCorredor = new ResultadoDto()
                    {
                        ID = resultado.ID,
                        Dorsal = resultado.Dorsal,
                        PosicionCategoria = resultado.PosicionCategoria,
                        PosicionGeneral = resultado.PosicionGeneral,
                        Tiempo = resultado.Tiempo,
                        Corredor = resultado.Corredor,
                        Distancia = resultado.Distancia,
                        Categoria = categoria


                    };

                    listResultadosDto.Add(resultCorredor);

                }




                return Ok(listResultadosDto);



            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut, Route("UpdateEstado/{eventoID}")]
        public async Task<IActionResult> UpdateStatus(int eventoID, bool estado)
        {
            try
            {
                var evento = await _eventoRepository.GetEvento(eventoID);
                if (evento is null)
                    return NotFound();

                string estadoEvento = estado ? "Activo" : "Inactivo";

                await _eventoRepository.UpdateStatus(eventoID, estadoEvento);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("Lugares")]
        public async Task<IActionResult> GetLugares()
        {
            try
            {
                var lugaresList = await _eventoRepository.GetLugares();

                if (lugaresList == null)
                {
                    return NotFound("No existen lugares con eventos");
                }
                return Ok(lugaresList);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }

        }

        [HttpGet, Route("Filtrar")]
        public async Task<IActionResult> GetFiltro([FromQuery] EventoFiltrosDto eventoDto)
        {
            try
            {

                var busqueda = eventoDto.Busqueda;
                var fechaInicio = eventoDto.FechaInicio;
                var fechaFin = eventoDto.FechaFin;
                var tipo = eventoDto.Tipo;
                var lugar = eventoDto.Lugar;

                var lugaresList = await _eventoRepository.GetFiltro(busqueda, fechaInicio, fechaFin, tipo, lugar);

                if (lugaresList == null)
                {
                    return NotFound("No existen lugares con eventos");
                }
                return Ok(lugaresList);

            }
            catch (Exception ex) { return BadRequest(ex.Message); }

        }

        [HttpGet, Route("InfoKits/{eventoID}")]
        public async Task<IActionResult> InfoKits(int eventoID)
        {
            try
            {
                var listInscrips = await _eventoRepository.GetInscripcionesByEvento(eventoID);



                var inscripciones = new List<KitDto>();
                foreach (var inscripcion in listInscrips)
                {
                    //buscar corredor y distancia 
                    Distancia distancia = await _distanciaRepository.GetDistancia(inscripcion.DistanciaID);
                    DistanciaDto distanciaDto = _mapper.Map<DistanciaDto>(distancia);

                    Corredor corredor = await _corredorRepository.GetCorredor(inscripcion.UsuarioID);
                    CorredorGetDto corredorDto = _mapper.Map<CorredorGetDto>(corredor);




                    var insc = new KitDto
                    {


                        Corredor = corredorDto,
                        Distancia = distanciaDto,
                        Remera = inscripcion.Remera,

                        Dorsal = inscripcion.Dorsal,




                    };

                    inscripciones.Add(insc);
                }
                return Ok(inscripciones);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        //Generar excel con info de kits e inscriptos
        [HttpGet("KitsExportarExcel/{eventoID}")]
        public async Task<IActionResult> ExportarKitsExcel(int eventoID)
        {
            // Consultar los datos desde la base de datos
            var listInscrips = await _eventoRepository.GetInscripcionesByEvento(eventoID);



            var inscripciones = new List<KitDto>();
            foreach (var inscripcion in listInscrips)
            {
                //buscar corredor y distancia 
                Distancia distancia = await _distanciaRepository.GetDistancia(inscripcion.DistanciaID);
                DistanciaDto distanciaDto = _mapper.Map<DistanciaDto>(distancia);

                Corredor corredor = await _corredorRepository.GetCorredor(inscripcion.UsuarioID);
                CorredorGetDto corredorDto = _mapper.Map<CorredorGetDto>(corredor);




                var insc = new KitDto
                {


                    Corredor = corredorDto,
                    Distancia = distanciaDto,
                    Remera = inscripcion.Remera,

                    Dorsal = inscripcion.Dorsal,




                };

                inscripciones.Add(insc);
            }
            // Crear un nuevo archivo Excel con ClosedXML
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add($"Inscriptos_Evento_{eventoID}");
                
                       
                // Agregar encabezados
                
                worksheet.Cell(1, 1).Value = "Dorsal";
                worksheet.Cell(1, 2).Value = "Nombre";
                worksheet.Cell(1, 3).Value = "Apellido";
                worksheet.Cell(1, 4).Value = "DNI";
                worksheet.Cell(1, 5).Value = "FechaNacimiento";
                worksheet.Cell(1, 6).Value = "DistanciaKM";
                worksheet.Cell(1, 7).Value = "Remera";

                // Llenar datos desde la base de datos
                for (int i = 0; i < inscripciones.Count; i++)
                {
                    worksheet.Cell(i + 2, 1).Value = inscripciones[i].Dorsal;
                    worksheet.Cell(i + 2, 2).Value = inscripciones[i].Corredor.Nombre;
                    worksheet.Cell(i + 2, 3).Value = inscripciones[i].Corredor.Apellido;
                    worksheet.Cell(i + 2, 4).Value = inscripciones[i].Corredor.Dni;
                    worksheet.Cell(i + 2, 5).Value = inscripciones[i].Corredor.FechaNacimiento;
                    worksheet.Cell(i + 2, 6).Value = inscripciones[i].Distancia.KM;
                    worksheet.Cell(i + 2, 7).Value = inscripciones[i].Remera;
                }

                // Guardar el archivo Excel en un stream de memoria
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    // Devolver el archivo Excel
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"Inscriptos_Evento_{eventoID}.xlsx");
                }
            }
        }

        [HttpPost, Route("EnviarEmail/{eventoID}")]
        public async Task<IActionResult> EnviarEmail(int eventoID, [FromQuery] string asunto, [FromQuery] string mensaje)
        {
            try
            {

                var eventoExists = _eventoRepository.CheckIfExists(eventoID);

                if (eventoExists == false) { return BadRequest("No existe el evento"); }

                var emails = await _eventoRepository.GetInscriptosEmails(eventoID);

                foreach (var email in emails)
                {
                    await _emailService.SendEmailAsync(email, asunto, mensaje);

                }
                return Ok("Correos enviados");




            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpPost, Route("CargarResultados/{eventoID}")]
        public async Task<IActionResult> Cargar(IFormFile file, int eventoID)
        {
            {
                Stream stream = file.OpenReadStream();

                IWorkbook MiExcel = null;

                if (Path.GetExtension(file.FileName) == ".xlsx")
                {
                    MiExcel = new XSSFWorkbook(stream);
                }
                else
                {
                    MiExcel = new HSSFWorkbook(stream);
                }

                ISheet HojaExcel = MiExcel.GetSheetAt(0);

                int cantidadFilas = HojaExcel.LastRowNum;
                List<ExcelDtoFileName> lista = new List<ExcelDtoFileName>();

                for (int i = 1; i <= cantidadFilas; i++)
                {

                    IRow fila = HojaExcel.GetRow(i);


                    var corredor = fila.GetCell(0).ToString();
                    var PosicionCategoria = fila.GetCell(1).ToString();
                    var PosicionGeneral = fila.GetCell(2).ToString();
                    var Tiempo = fila.GetCell(3).ToString();
                   
                    int corredorID = int.Parse(corredor);
                    //TimeSpan tiempo = int.Parse(Tiempo);


                   
                  await _eventoRepository.CargarResultado(eventoID, corredorID, PosicionCategoria, PosicionGeneral, Tiempo);

                }



                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });


            }
        }

    }
}


