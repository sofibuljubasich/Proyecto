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

            public DistanciaController(IMapper mapper, IDistanciaRepository distanciaRepository)
            {
                _mapper = mapper;
                _distanciaRepository = distanciaRepository;
            }

            [HttpGet("{eventoID}")]
            public async Task<IActionResult> GetDistanciasByEvento(int eventoID)
            {
                try
                {
                    var distancias = await _distanciaRepository.GetDistanciasByEvento(eventoID);

                    var distanciasDto = _mapper.Map<DistanciaDto>(distancias);

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
                    


                    return Ok(listDistancias);
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


                    return Ok(distancia);

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
            public async Task<IActionResult> Create(DistanciaDto distanciaDto)
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

          //FALTA UPDATE
            }
        }

