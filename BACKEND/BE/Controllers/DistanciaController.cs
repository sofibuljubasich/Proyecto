using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistanciaController : Controller
    {
        

            private readonly IMapper _mapper;
            private readonly IDistanciaRepository _distanciaRepository;
            private readonly IEventoRepository _eventoRepository;   
            public DistanciaController(IMapper mapper, IDistanciaRepository distanciaRepository,IEventoRepository eventoRepository)
            {
                _mapper = mapper;
                _distanciaRepository = distanciaRepository;
                _eventoRepository = eventoRepository;   
            }

        [HttpGet, Route("evento/{eventoID}")]

        public async Task<IActionResult> GetDistanciasByEvento(int eventoID)
            {
                try
                {
                    var evento = await _eventoRepository.GetEvento(eventoID);

                    if (evento == null)
                        return NotFound();  
             

                var distancias = await _distanciaRepository.GetDistanciasByEvento(eventoID);

                    var distanciasDto = _mapper.Map<IEnumerable<EventoDistanciaDto>>(distancias);

                    return Ok(distanciasDto);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
        }

            [HttpGet]
            public async Task<IActionResult> Get()
            {
                try
                {
                    var listDistancias = await _distanciaRepository.GetDistancias();
                    
                    var listDistanciasDto = _mapper.Map<IEnumerable<DistanciaDto>>(listDistancias); 

                    return Ok(listDistanciasDto);
                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }

            }

            [HttpGet("{id}")]
            public async Task<IActionResult> Get(int id)
            {
                try
                {
                    var distancia = await _distanciaRepository.GetDistancia(id);

                    if (distancia == null)
                    {
                        return NotFound();
                    }

                    var distanciaDto = _mapper.Map<DistanciaDto>(distancia);
                    return Ok(distanciaDto);

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                try
                {
                    var distancia = await _distanciaRepository.GetDistancia(id);

                    if (distancia == null)
                    {
                        return NotFound();
                    }

                    await _distanciaRepository.Delete(distancia);

                    return NoContent();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            [HttpPost]
            public async Task<IActionResult> Create(DistanciaCreateUpdateDto distanciaDto)
            {
                try
                {
                    var distancia = _mapper.Map<Distancia>(distanciaDto);

                //mascota.FechaCreacion = DateTime.Now;

                distancia = await _distanciaRepository.Create(distancia);
                
                


                    return CreatedAtAction("Get", new { id = distancia.ID }, distancia);

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DistanciaCreateUpdateDto distanciaDto)
        { 
            try
            {
                
                
               var distanciaItem = await _distanciaRepository.GetDistancia(id);

                if (distanciaItem == null)
                {
                    return NotFound();
                }

                Distancia d = new Distancia
                {
                    ID = id,
                    KM = distanciaDto.KM,
                };
                
                await _distanciaRepository.Update(d);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

            }
        }

