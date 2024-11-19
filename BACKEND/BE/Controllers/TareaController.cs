using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Migrations;
using BE.Models;
using BE.Services;
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
        private readonly ITareaVoluntarioService _tareaVoluntarioService;
        public TareaController(IMapper mapper, ITareaRepository tareaRepository,IVoluntarioRepository voluntarioRepository, ITareaVoluntarioService tareaVoluntarioService)
        {
            _mapper = mapper;   
            _tareaRepository = tareaRepository; 
            _voluntarioRepository = voluntarioRepository;
            _tareaVoluntarioService = tareaVoluntarioService;
            
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try 
            {
                var tareas = await _tareaRepository.GetTareas();

                if (tareas == null)
                    return NotFound();

                
                return Ok(tareas);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        
        }

        [HttpGet("{tareaID}")]
        public async Task<IActionResult> Get(int tareaID)
        {
            try 
            {
                var tarea = await _tareaRepository.GetTarea(tareaID);

                if (tarea == null)
                    return NotFound();

                var voluntarios = await _tareaVoluntarioService.GetVoluntariosByTarea(tareaID);    

                var tareaDto = new TareaDto
                {
                    ID = tarea.ID,  
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

                
                //var listTareasDto = _mapper.Map<List<TareaDto>>(listTareas);  

                var tareas = new List<TareaEstadoDto>();

                foreach(var t in listTareas)
                {
                    var TareaEstadoDto = new TareaEstadoDto
                    {
                        ID = t.ID,
                        Descripcion = t.Descripcion,
                        FechaHora = t.FechaHora,
                        Ubicacion = t.Ubicacion,
                        TareaVoluntarios = _mapper.Map<List<TareaVoluntarioDto>>(t.TareaVoluntarios)

                    };

                    tareas.Add(TareaEstadoDto); 

                }

                

                return Ok(tareas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]TareaCreateDto tareaDto)
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

                List<Voluntario>?voluntarios = null;
                if (tareaDto.VoluntariosID != null && tareaDto.VoluntariosID.Any())
               {
                   voluntarios = await _voluntarioRepository.GetVoluntarios(tareaDto.VoluntariosID);
               }



                tarea = await _tareaRepository.Create(tarea);

                 
                await _tareaVoluntarioService.CreateTareaVoluntario(tarea.ID, voluntarios);


                return Ok(tarea.ID);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        [HttpPut("{tareaID}")]
        public async Task<IActionResult> Update(int tareaID, [FromBody]TareaUpdateDto tareaDto)
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

                /*
                List<TareaVoluntario> tareaVoluntarios = new List<TareaVoluntario>();

                foreach (var voluntarioID in tareaDto.VoluntariosID)
                {

                    var tareaVoluntario = new TareaVoluntario
                    {
                        TareaID = tareaID,
                        VoluntarioID = voluntarioID
                   
                    };

                    tareaVoluntarios.Add(tareaVoluntario);

                }
                
                tarea.TareaVoluntarios = tareaVoluntarios;  
                */
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
