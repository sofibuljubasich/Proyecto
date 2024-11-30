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
        [HttpGet("{voluntarioID}/eventos")]
        public async Task<IActionResult> GetEventosByVoluntario(int voluntarioID)
        {
            var eventos = await _tareaVoluntarioRepository.GetEventosByVoluntario(voluntarioID);

            if (eventos is null)
            {
                return NotFound("No se encontraron eventos para el voluntario especificado.");
            }

            var eventosDto = _mapper.Map<List<EventoDto>>(eventos);     
            return Ok(eventosDto);
        }

        [HttpGet, Route("tareas/{eventoID}/{voluntarioID}")]
        public async Task<IActionResult> GetTareasByEventoVoluntario(int eventoID, int voluntarioID)
        {

            try
            {
                var listTareas = await _tareaVoluntarioRepository.GetTareasByEventoVoluntario(eventoID, voluntarioID);

                if (listTareas == null)
                {
                    return NotFound("El voluntario no tiene tareas asignadas en ese evento");
                }

                //var listTareasDto = _mapper.Map<List<TareaEstadoDto>>(listTareas);

                foreach (var t in listTareas)
                {
                    t.tarea.OtrosVoluntarios = t.tarea.OtrosVoluntarios.Where(v=>v.ID!=voluntarioID).ToList();
                    
                }

                return Ok(listTareas);
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

        [HttpPut("UpdateVoluntarios/{tareaID}")]
        public async Task<IActionResult> UpdateVoluntarios(int tareaID, List<int> voluntariosID)
        {
            
                try
                {
                    // Buscar la tarea por ID y cargar las asignaciones de voluntarios actuales
                    var tareaVoluntarios = await _tareaVoluntarioRepository.GetVoluntariosByTarea(tareaID);

                    if (tareaVoluntarios == null)
                    {
                        return NotFound("Tarea no encontrada");
                    }

                    // Obtener los IDs de los voluntarios actualmente asignados a la tarea
                    var currentVoluntariosIds = tareaVoluntarios.Select(tv => tv.ID).ToList();

                    // Remover los voluntarios que ya no están en la nueva lista
                    var voluntariosToRemove = tareaVoluntarios
                        .Where(tv => !voluntariosID.Contains(tv.ID))
                        .ToList();

                  
                    if (voluntariosToRemove.Any())
                    {
                        List<TareaVoluntario> tareavoluntariosToRemove = voluntariosToRemove
                            .Select(v => new TareaVoluntario
                             {
                                        TareaID = tareaID,
                                        VoluntarioID = v.ID
                               })
                               .ToList();


                        await _tareaVoluntarioRepository.RemoveVoluntarios(tareavoluntariosToRemove);
                    }

                    // Agregar nuevos voluntarios que no estén ya asignados a la tarea
                    var voluntariosToAdd = voluntariosID
                        .Where(voluntarioID => !currentVoluntariosIds.Contains(voluntarioID))
                        .ToList();

                    foreach (var voluntarioID in voluntariosToAdd)
                    {
                        await _tareaVoluntarioRepository.AddVoluntario(tareaID, voluntarioID);
                    }

                    return Ok("Tarea actualizada");
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