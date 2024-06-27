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
    public class UsuarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioController(IMapper mapper, IUsuarioRepository usuarioRepository)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listUsers = await _usuarioRepository.GetUsuarios();   

                //var listUsersDto = _mapper.Map<IEnumerable<UsuarioDto>>(listUsers);

                return Ok(listUsers);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{usuarioID}")]
        public async Task<IActionResult> Get(int usuarioID)
        {
            try
            {
                var usario = await _usuarioRepository.GetUsuario(usuarioID);

                if (usario == null)
                {
                    return NotFound();
                }

                var usuarioDto = _mapper.Map<UsuarioDto>(usario);

                

                return Ok(usuarioDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> CrearUsuario([FromBody] RegisterDto request)
        {
            try
            { 

                var userByEmail = _usuarioRepository.CheckIfUserExists(request.Email);

                if (userByEmail is true)
                    return BadRequest("Usuario ya registrado");

                var usuario = _mapper.Map<Usuario>(request);

                //await _emailSender.SendEmailAsync(user.Username, user.Password);

                usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);
                usuario.RolID = 3; // ROL Admin
               
                var result = await _usuarioRepository.CreateUsuario(usuario);

                return Ok("Administrador creado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }










    }
}
