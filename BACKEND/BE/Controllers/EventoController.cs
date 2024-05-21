using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

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

        public EventoController(IMapper mapper, IEventoRepository eventoRepository,ICategoriaRepository categoriaRepository,IDistanciaRepository distanciaRepository,
                IEventoDistanciaRepository eventoDistanciaRepository, ICorredorRepository corredorRepository)
        {
            _mapper = mapper;
            _eventoRepository = eventoRepository;
            _categoriaRepository = categoriaRepository;
            _distanciaRepository = distanciaRepository;
            _eventoDistanciaRepository = eventoDistanciaRepository;
            _corredorRepository = corredorRepository;
        }   

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listEventos = await _eventoRepository.GetEventos();

                var listEventosDto = _mapper.Map<IEnumerable<EventoDto>>(listEventos);


                var eventosRtaDto = new List<EventoRespuestaDto>();

                foreach (var evento in listEventosDto) 
                {
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
                        Evento = evento,
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
        [HttpGet,Route("inscriptos/{eventoID}")]
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

                    var insc = new InscripcionDto
                    {
                        ID = inscripcion.ID,
                        Fecha = inscripcion.Fecha,

                        Corredor = corredorDto,
                        Distancia = distanciaDto,
                        Remera = inscripcion.Remera,
                        FormaPago = inscripcion.FormaPago,
                        EstadoPago = inscripcion.EstadoPago,
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
       /*[HttpGet,Route("voluntarios/{eventoID}")]
        public async Task<IActionResult> GetVoluntarios(int eventoID)
        {
            try
            {
                var listVoluntarios = await _eventoRepository.GetVoluntariosByEvento(eventoID);

                var listVoluntariosDto = _mapper.Map<IEnumerable<VoluntarioDto>>(listVoluntarios);

                return Ok(listVoluntariosDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }*/

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
        public async Task<IActionResult> Create([FromBody]EventoCreateDto eventoDto)
        {
            try
            {
                var distancias = eventoDto.EventoDistancias;

                var newEvento = new Evento() 
                {
                    Nombre = eventoDto.Nombre,
                    Lugar = eventoDto.Lugar,
                    Fecha = eventoDto.Fecha,
                   // Imagen = eventoDto.Imagen,
                    Estado = eventoDto.Estado,
                    TipoID = eventoDto.TipoID
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
                await _eventoDistanciaRepository.Update(eventoID,edlist);
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

                if (evento.Estado=="Activo") 
                {
                    return BadRequest("Evento No Finalizado ");                
                }
                var listResultados = await _eventoRepository.GetResultados(eventoID);

                var listResultadosDto = _mapper.Map<IEnumerable<ResultadoDto>>(listResultados);

                return Ok(listResultadosDto);
            
            
            
            }
            catch(Exception ex) 
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
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }

    }


