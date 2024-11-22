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
        public async Task<IActionResult> CrearUsuario([FromForm] RegisterUserDto request)
        {
            try
            { 

                var userByEmail = _usuarioRepository.CheckIfUserExists(request.Email);

                if (userByEmail is true)
                    return BadRequest("Usuario ya registrado");

                string ImagenURL;

                if (request.Imagen != null && request.Imagen.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.Imagen.FileName);
                    var path = Path.Combine("wwwroot/imagenes/profile", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await request.Imagen.CopyToAsync(stream);
                    }

                    ImagenURL = "/Imagenes/profile/" + fileName;
                }
                else
                {
                    // Asignar una imagen por defecto
                    ImagenURL = "/Imagenes/profile/user-empty.png";
                }

                var usuario = _mapper.Map<Usuario>(request);
                usuario.Imagen = ImagenURL;

                //await _emailSender.SendEmailAsync(user.Username, user.Password);

                usuario.Password = BCrypt.Net.BCrypt.HashPassword(usuario.Password);
                usuario.RolID = request.RolID; // ROL Admin - Hacerlo Bien
                usuario.ConfirmedEmail = true;

                var result = await _usuarioRepository.CreateUsuario(usuario);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPatch, Route("UpdateRol")]
        public async Task<IActionResult> UpdateRol(int usuarioID, int rolID)
        {
            try
            {
                var usuario = await _usuarioRepository.GetUsuario(usuarioID);

                if (usuario == null)
                {
                    return NotFound();
                }

                usuario.RolID = rolID;
                await _usuarioRepository.UpdateUsuario(usuario);
                return Ok("Rol actualizado");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }


        }

        [HttpPut("{usuarioID}")]
        public async Task<IActionResult> Update(int usuarioID, [FromBody]UsuarioUpdateDto usuarioDto)
        {
            try
            {

                var usuario = await _usuarioRepository.GetUsuario(usuarioID);

                if (usuario == null)
                {
                    return NotFound();
                }

             
                
                await _usuarioRepository.UpdateUsuario(usuario);

                

                return Ok("Usuario actualizada");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost, Route("UploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No se recibió ningún archivo.");
                }

                // Generar un nombre único para el archivo
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var uploadPath = Path.Combine("wwwroot/images/correo", fileName);

                // Guardar el archivo en el servidor
                using (var stream = new FileStream(uploadPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Devolver la URL de la imagen
                var imageUrl = $"{Request.Scheme}://{Request.Host}/images/correo/{fileName}";
                return Ok(new { location = imageUrl });
                //return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }











    }
}
