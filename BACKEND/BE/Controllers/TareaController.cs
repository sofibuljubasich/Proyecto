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
    public class TareaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITareaRepository _tareaRepository;
        private readonly IVoluntarioRepository _voluntarioRepository;   
        public TareaController(IMapper mapper, ITareaRepository tareaRepository,IVoluntarioRepository voluntarioRepository)
        {
            _mapper = mapper;   
            _tareaRepository = tareaRepository; 
            _voluntarioRepository = voluntarioRepository;
            
        }

        [HttpGet("{tareaID}")]
        public async Task<IActionResult> Get(int tareaID)
        {
            try 
            {
                var tarea = await _tareaRepository.GetTarea(tareaID);

                if (tarea == null)
                    return NotFound();

                var voluntarios = tarea.Voluntarios;

                var tareaDto = new TareaDto
                {
                    Descripcion = tarea.Descripcion,
                    FechaHora = tarea.FechaHora,
                    Ubicacion = tarea.Ubicacion,
                    EventoID = tarea.EventoID,
                    Voluntarios = _mapper.Map<ICollection<VoluntarioDto>>(voluntarios)

                };

                return Ok(tareaDto);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        
        }

        
        [HttpGet, Route("evento/{eventoID}")]
        public async Task<IActionResult> GetByEvento(int eventoID)
        {
            try
            {


                var listTareas = await _tareaRepository.GetTareasByEvento(eventoID);

                var listTareasDto = _mapper.Map<List<TareaDto>>(listTareas);  
                

                return Ok(listTareasDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]TareaCreateUpdateDto tareaDto)
        {
            try
            {
              

                    var tarea = new Tarea
                    {
                        Descripcion = tareaDto.Descripcion,
                        FechaHora = tareaDto.FechaHora,
                        Ubicacion = tareaDto.Ubicacion,
                        EventoID = tareaDto.EventoID,

                    };
                if (tareaDto.VoluntariosID != null && tareaDto.VoluntariosID.Any())
                {
                    tarea.Voluntarios = await _voluntarioRepository.GetVoluntarios(tareaDto.VoluntariosID);
                }



                tarea = await _tareaRepository.Create(tarea);


                return Ok("Tarea creada");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [HttpPut("{tareaID}")]
        public async Task<IActionResult> Update(int tareaID, [FromBody]TareaCreateUpdateDto tareaDto)
        {
            try
            {
               // var tarea = _mapper.Map<Tarea>(tareaDto);

              

                var tarea = await _tareaRepository.GetTarea(tareaID);

                if (tarea == null)
                {
                    return NotFound();
                }

                tarea.Descripcion = tareaDto.Descripcion;
                tarea.EventoID = tareaDto.EventoID;
                tarea.FechaHora = tareaDto.FechaHora;
                tarea.Ubicacion = tareaDto.Ubicacion;

               
                 tarea.Voluntarios = await _voluntarioRepository.GetVoluntarios(tareaDto.VoluntariosID);
                

                await _tareaRepository.Update(tarea);

                return Ok("Tarea actualizada");

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

                return Ok("Tarea eliminada");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}
