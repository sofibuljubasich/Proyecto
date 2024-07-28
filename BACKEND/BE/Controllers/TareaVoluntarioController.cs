using AutoMapper;
using BE.Interfaces;
using BE.Dto;
using Microsoft.AspNetCore.Mvc;
using BE.Models;
using BE.Repository;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaVoluntarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITareaVoluntarioRepository _tareaVoluntarioRepository;
       
        public TareaVoluntarioController(IMapper mapper, ITareaVoluntarioRepository tareaVoluntarioRepository)
        {
            _mapper = mapper;
            _tareaVoluntarioRepository = tareaVoluntarioRepository;
           
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int tareaID, [FromQuery] int voluntarioID) 
        {
            try
            {
                var tv = await _tareaVoluntarioRepository.Get(tareaID, voluntarioID);

                if (tv == null)
                    return NotFound();

                var tvDto = _mapper.Map<TareaVoluntarioDto>(tv);


                return Ok(tvDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("tareas/{eventoID}/{voluntarioID}")]
        public async Task<IActionResult> GetTareasByEventoVoluntario(int eventoID, int voluntarioID)
        {

            /* {
    "id": 3,
    "descripcion": "nueva",
    "fechaHora": "2024-03-16T14:36:44.297",
    "ubicacion": "nueva",
    "eventoID": 5,
    "evento": null,
    "tareaVoluntarios": null */

            try
            {
                var listTareas = await _tareaVoluntarioRepository.GetTareasByEventoVoluntario(eventoID, voluntarioID);

                if (listTareas == null)
                {
                    return NotFound("El voluntario no tiene tareas asignadas en ese evento");
                }

                var listTareasDto = _mapper.Map<List<TareaGetDto>>(listTareas);


                return Ok(listTareasDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int tareaID, [FromQuery] int voluntarioID) 
        {
            try
            {
                var tvDB = await _tareaVoluntarioRepository.Get(tareaID,voluntarioID);

                if (tvDB == null)
                {
                    return NotFound();
                }

                await _tareaVoluntarioRepository.DeleteTareasByVoluntario(tvDB);    

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("tareas/{voluntarioID}")]
        public async Task<IActionResult> GetByVoluntario(int voluntarioID)
        {
            try
            {
                var listTareas = await _tareaVoluntarioRepository
                    .GetTareasByVoluntario(voluntarioID);

                if (listTareas == null)
                {
                    return NotFound("El voluntario no tiene tareas asignadas");
                }

                var listTareasDto = _mapper.Map<List<TareaGetDto>>(listTareas);


                return Ok(listTareasDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPatch, Route("UpdateEstado")]
        public async Task<IActionResult> UpdateEstado([FromBody]TareaVoluntarioEstadoDto tvDto)
        {
            try
            {
                var tareaVoluntarioDB = await _tareaVoluntarioRepository.Get(tvDto.TareaID,tvDto.VoluntarioID);
                if (tareaVoluntarioDB is null)
                    return NotFound();

                tareaVoluntarioDB.Estado = tvDto.Estado;

                await _tareaVoluntarioRepository.AddEstado(tareaVoluntarioDB);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpPatch, Route("AddComentario")]
        public async Task<IActionResult> AddEstado([FromBody] TareaVoluntarioComentarioDto tvDto)
        {
            try
            {
                var tareaVoluntarioDB = await _tareaVoluntarioRepository.Get(tvDto.TareaID, tvDto.VoluntarioID);
                if (tareaVoluntarioDB is null)
                    return NotFound();

                tareaVoluntarioDB.Comentario = tvDto.Comentario;

                await _tareaVoluntarioRepository.AddComentario(tareaVoluntarioDB);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

    }
}