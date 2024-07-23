using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Text;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUsuarioRepository _userRepository;
        private readonly ICorredorRepository _corredorRepository;  
        private readonly IMapper _mapper;



        public AuthController(IUsuarioRepository userRepository,ICorredorRepository corredorRepository, IConfiguration config,IMapper mapper)
        {
            _userRepository = userRepository;
            _corredorRepository = corredorRepository;   
            _config = config;
            _mapper = mapper;
        }

        //Login 
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {

            var user = await _userRepository.GetUsuarioByEmail(loginDto.UserEmail);

            if ( user == null)
            {
                return BadRequest("Email inexistente");

            }

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return BadRequest("Contraseña incorrecta");

            // Generamos un token según los claims
            /*var claims = new List<Claim>
            {
               new Claim("id", user.ID.ToString()),
               new Claim("email", user.Email),
               new Claim("fullname", $"{user.Nombre} {user.Apellido}"),
              // new Claim("rol", user.Rol.Descripcion)


            };

           var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
           var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
           var tokenDescriptor = new JwtSecurityToken(
               issuer: _config["Jwt:Issuer"],
               audience: _config["Jwt:Audience"],
               claims: claims,
               expires: DateTime.Now.AddMinutes(720),
               signingCredentials: credentials);

           var jwt = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);*/

            return Ok(user.ID);
        }

        //Register. VER COMO PASAR LOS DATOS DEL USER. SI HACER OTRO EP APARTE
        [HttpPost("register")]
        public async Task<IActionResult> RegisterCorredor([FromBody] RegisterDto request)
        {
            try
            {
                var userByEmail = _userRepository.CheckIfUserExists(request.Email);
                if (userByEmail is true)
                    return BadRequest("Email ya registrado");

                // Manejar la imagen de perfil si está presente en la solicitud
                string ImagenURL;
                
                if (request.Imagen != null && request.Imagen.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(request.Imagen.FileName);
                    var path = Path.Combine("wwwroot/imagenes/profile", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await request.Imagen.CopyToAsync(stream);
                    }

                    ImagenURL = "/images/profile" + fileName;
                }
                else
                {
                    // Asignar una imagen por defecto
                    ImagenURL = "/imagenes/profile/user-empty.png";     
                }

                // Mapear los datos del DTO a la entidad de Corredor
          


                //ver si validar algo mas del usuario

                var user = _mapper.Map<Corredor>(request);
                user.Imagen = ImagenURL;


                //await _emailSender.SendEmailAsync(user.Username, user.Password);

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.RolID = 1; // ROL USUARIO
                var result = await _corredorRepository.CreateCorredor(user);    

                return Ok(result.ID);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);  
            }

        }
    }
}
