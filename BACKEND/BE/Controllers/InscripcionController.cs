using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using BE.Services;
using MercadoPago.Resource.User;
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
        private readonly IEmailService _emailService;

        public InscripcionController(IMapper mapper, IInscripcionRepository inscripcionRepository, ICategoriaRepository categoriaRepository, IUsuarioRepository usuarioRepository, IEmailService emailService)
        {
            _mapper = mapper;
            _inscripcionRepository = inscripcionRepository;
            _categoriaRepository = categoriaRepository;
            _usuarioRepository = usuarioRepository;
            _emailService = emailService;

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


                //Confirmacion via email
                string emailBody = GenerateEmailBody(inscrip, corredor, categoria);

                await _emailService.SendEmailAsync(corredor.Email, "Confirmación de Inscripción", emailBody);



                return CreatedAtAction("Get", new { id = inscrip.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GenerateEmailBody(Inscripcion inscripcion, Corredor corredor, Categoria categoria)
        {
            // Plantilla HTML del correo
            string template = System.IO.File.ReadAllText("Services/confirminscrip.html");

            // Reemplazar los valores dinámicos
            template = template.Replace("[Nombre]", corredor.Nombre);

            template = template.Replace("[Evento]", inscripcion.Evento.Nombre);
            
            string categoriaString = $"{categoria.EdadInicio}-{categoria.EdadFin} años";

            template = template.Replace("[Categoria]", categoriaString);
            template = template.Replace("[Dorsal]", inscripcion.Dorsal.ToString());
            template = template.Replace("[Fecha]", inscripcion.Fecha.ToString("dd/MM/yyyy"));
            if (!string.IsNullOrEmpty(inscripcion.NroTransaccion))
            {
                template = template.Replace(
                    "[NroTransaccion]",
                    $"<li><strong>Número de Transacción Mercado Pago:</strong> {inscripcion.NroTransaccion}</li>"
                );
            }
            else
            {
                template = template.Replace("[NroTransaccion]", "");
            }


            template = template.Replace("[Remera]", inscripcion.Remera);
            template = template.Replace("[Forma]", inscripcion.FormaPago);
            template = template.Replace("[Estado]", inscripcion.EstadoPago);
            template = template.Replace("[Precio]", inscripcion.Precio.ToString());
            return template;
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

        [HttpGet("GetInscripcion/{eventoID}/{corredorID}")]
        public async Task<IActionResult> GetInscripcion(int eventoID, int corredorID)
        {
            var inscripcion = await _inscripcionRepository.Get(eventoID, corredorID);

            if (inscripcion is null){
                return NotFound();  
           
            }
            var categoria = await _categoriaRepository.GetCategoria(inscripcion.CategoriaID);

            var inscDto = new InscripcionGetDto
            {
                NombreEvento = inscripcion.NombreEvento,
                Imagen = inscripcion.Imagen,    
                Fecha = inscripcion.Fecha,  
                Hora = inscripcion.Hora,    
                Tipo = inscripcion.Tipo,    
                LugarEvento = inscripcion.LugarEvento,  
                Distancia = inscripcion.Distancia,
                Categoria = _mapper.Map<CategoriaDto>(categoria),   
            };
            return Ok(inscDto); 





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
