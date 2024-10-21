using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    public class MensajeController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IMensajeRepository _mensajeRepository;


        public MensajeController(IMensajeRepository mensajeRepository, IMapper mapper)
        {
            _mensajeRepository = mensajeRepository;
            _mapper = mapper;
        }


        [HttpPost("NuevoMensaje")]
        public async Task<IActionResult> NuevoMensaje([FromBody] MensajeCreateDto mensajeDto)
        {

            try
            {
                var mensaje = new Mensaje
                {
                    destinatarioID = mensajeDto.destinatarioID,
                    remitenteID = mensajeDto.remitenteID,
                    FechaHoraEnvio = DateTime.Now,
                    Contenido = mensajeDto.Contenido,
                    EstadoLeido = false
                };

                var result = await _mensajeRepository.Create(mensaje);

                return Ok(result);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpGet("Chats")]
        public async Task<IActionResult> GetChats([FromQuery] int usuarioID)
        {
            try
            {

                var listChats = await _mensajeRepository.GetChats(usuarioID);

                if (listChats == null) return NotFound("No hay mensajes");
                return Ok(listChats);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpGet("Mensajes")]
        public async Task<IActionResult> GetMensajes([FromQuery] int usuarioID, [FromQuery] int otroID)
        {
            try
            {

                var mensajes = await _mensajeRepository.GetMensajes(usuarioID, otroID);

                if (mensajes != null) 
                {
                    var mensajesRecibidos = mensajes.Where(m => m.destinatarioID == usuarioID).ToList();
                    await _mensajeRepository.MarcarLeido(mensajesRecibidos);
                }   






                return Ok(mensajes);


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }







        }
    }
}
