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
    public class InscripcionController : ControllerBase
    {
        private readonly IMapper _mapper;   
        private readonly IInscripcionRepository _inscripcionRepository;

        public InscripcionController(IMapper mapper, IInscripcionRepository inscripcionRepository)
        {
            _mapper = mapper;
            _inscripcionRepository = inscripcionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InscripcionCreateDto inscripcionDto)
        {
            try
            {
                var inscrip = _mapper.Map<Inscripcion>(inscripcionDto);

                inscrip.Fecha = DateTime.Now;
                var inscripByUser =await  _inscripcionRepository.CheckIfExists(inscripcionDto.UsuarioID, inscripcionDto.EventoID);

                if (inscripByUser != null) 
                { 
                    return BadRequest("Corredor ya inscripto");
                }



                inscrip = await _inscripcionRepository.CreateInscripcion(inscrip);


                return CreatedAtAction("Get", new { id = inscrip.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("inscripcionID")]
        public async Task<IActionResult> Get(int inscripcionID)
        {
            try
            {
                var inscripcion = await _inscripcionRepository.GetInscripcion(inscripcionID);

                var inscripcionDto = _mapper.Map<InscripcionDto>(inscripcion);
                return Ok(inscripcion);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }



        }

        [HttpPatch, Route("acreditar/{inscripcionID}")]
        public async Task<IActionResult> Acreditar(int inscripcionID, [FromBody] Boolean estado) 
        {
            try {

                var inscripcion = await _inscripcionRepository.GetInscripcion(inscripcionID);

                if (inscripcion == null) 
                {
                    return NotFound();  
                }

                await _inscripcionRepository.Acreditar(inscripcionID, estado);

                return Ok("Actualizado");    
            } 
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }    
        }



    }
}
