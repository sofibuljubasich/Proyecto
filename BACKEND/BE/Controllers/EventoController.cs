using AutoMapper;
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
        
        [HttpGet,Route("InfoKits/{eventoID}")]
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

        [HttpPost, Route("EnviarEmail/{eventoID}")]
        public async Task<IActionResult>EnviarEmail(int eventoID, [FromQuery] string asunto, [FromQuery] string mensaje)
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
        public async Task<IActionResult> CargarResultados(int eventoID, [FromForm] IFormFile file)
        {
            try
            {
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);  
                if (file == null || file.Length == 0)
                { return BadRequest("Archivo vacío"); }

               
                var uploadsFolder = $"{Directory.GetCurrentDirectory()}\\Uploads";

                if (!Directory.Exists(uploadsFolder))
                { Directory.CreateDirectory(uploadsFolder); }       

                var filePath = Path.Combine(uploadsFolder, file.Name);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        do
                        {
                            bool headerSkip = false;
                            while (reader.Read())
                            {
                                if (!headerSkip)
                                {
                                    headerSkip = true;
                                    continue;
                                }

                                int corredorID = (int)reader.GetValue(1);
                                string? posicionCat = reader.GetValue(2).ToString();    
                                string? posicionGral = reader.GetValue(3).ToString();
                                int? tiempo = (int)reader.GetValue(4);

                                await _eventoRepository.CargarResultado(eventoID, corredorID, posicionCat, posicionGral, tiempo);

                         
                              
    }


                        }while (reader.NextResult()) ;      
                    }
                
                }
                return Ok("Resultados cargados");


            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



    }
}


