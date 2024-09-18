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
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public InscripcionController(IMapper mapper, IInscripcionRepository inscripcionRepository, ICategoriaRepository categoriaRepository, IUsuarioRepository usuarioRepository)
        {
            _mapper = mapper;
            _inscripcionRepository = inscripcionRepository;
            _categoriaRepository = categoriaRepository;
            _usuarioRepository = usuarioRepository;

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InscripcionCreateDto inscripcionDto)
        {
            try
            {


                var inscripByUser = await _inscripcionRepository.CheckIfExists(inscripcionDto.UsuarioID, inscripcionDto.EventoID);

                if (inscripByUser != null)
                {
                    return BadRequest("Corredor ya inscripto");
                }

                var inscrip = _mapper.Map<Inscripcion>(inscripcionDto);

                //var distancia = _distanciaRe

                inscrip.Fecha = DateTime.Now;

                var corredor = await _usuarioRepository.GetCorredor(inscrip.UsuarioID);

               

                DateTime fechaCorredor = (DateTime)corredor.FechaNacimiento;

                var edad = DateTime.Now.Year - fechaCorredor.Year;

                var categoria = await _categoriaRepository.CalculateCategory(edad);

                inscrip.CategoriaID = categoria.ID;
                inscrip.Dorsal = inscrip.UsuarioID;

                inscrip = await _inscripcionRepository.CreateInscripcion(inscrip);

                inscrip.NroTransaccion = inscripcionDto.NroTransaccion;
                return CreatedAtAction("Get", new { id = inscrip.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{corredorID}")]
        public async Task<IActionResult>GetEventosByUser(int corredorID)
        {

            try
            {

                var eventosByCorredor = await _inscripcionRepository.ObtenerEventosInscritosPorUsuario(corredorID);


                var eventosByCorredorDto = _mapper.Map<List<EventoDto>>(eventosByCorredor);

                return Ok(eventosByCorredorDto);
            }catch (Exception ex)
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

        [HttpPatch, Route("ActualizarPago/{inscripcionID}")]
        public async Task<IActionResult> ActualizarPago(int inscripcionID, [FromBody] String estadoPago)
        {
            try
            {
                var inscripcion = await _inscripcionRepository.GetInscripcion(inscripcionID);

                if (inscripcion == null)
                {
                    return NotFound();
                }

                await _inscripcionRepository.UpdatePayment(inscripcionID, estadoPago);

                return Ok("Estado Pago Actualizado");

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
