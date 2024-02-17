using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITareaRepository _tareaRepository;
        public TareaController(IMapper mapper, ITareaRepository tareaRepository)
        {
            _mapper = mapper;   
            _tareaRepository = tareaRepository; 
            
        }

        [HttpGet("{tareaID}")]
        public async Task<IActionResult> Get(int tareaID)
        {
            try 
            {
                var tarea = await _tareaRepository.GetTarea(tareaID);

                if (tarea == null)
                    return NotFound();

                return Ok(tarea);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        
        }

        /// VER SI VALIDAR EL EVETNO
        [HttpGet("{eventoID}")]
        public async Task<IActionResult> GetByEvento(int eventoID)
        {
            try
            {
                var listTareas = await _tareaRepository.GetTareasByEvento(eventoID);

                return Ok(listTareas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{voluntarioID}")]
        public async Task<IActionResult> GetByVoluntario(int voluntarioID)
        {
            try
            {
                var listTareas = await _tareaRepository.GetTareasByVoluntario(voluntarioID);

                return Ok(listTareas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Create(TareaCreateUpdateDto tareaDto)
        {
            try
            {
                var tarea = _mapper.Map<Tarea>(tareaDto);



                tarea = await _tareaRepository.Create(tarea);


                return CreatedAtAction("Get", new { id = tarea.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //Task<List<Tarea>> GetTareas();




        [HttpPut("{tareaID}")]
        public async Task<IActionResult> Update(int tareaID, TareaCreateUpdateDto tareaDto)
        {
            try
            {
                var tarea = _mapper.Map<Tarea>(tareaDto);

                if (tareaID != tareaID)
                {
                    return BadRequest();
                }

                var tareaItem = await _tareaRepository.GetTarea(tareaID);

                if (tareaItem == null)
                {
                    return NotFound();
                }

                await _tareaRepository.Update(tarea);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{tareaID}")]
        public async Task<IActionResult> Delete(int tareaID)
        {
            try
            {
                var tarea = await _tareaRepository.GetTarea(tareaID);


                if (tarea == null)
                {
                    return NotFound();
                }

                await _tareaRepository.Delete(tarea);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}
