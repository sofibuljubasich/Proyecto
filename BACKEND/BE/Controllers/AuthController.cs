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
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUsuarioRepository _userRepository;
        private readonly ICorredorRepository _corredorRepository;  
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;


        public AuthController(IUsuarioRepository userRepository,ICorredorRepository corredorRepository,
            IConfiguration config,IMapper mapper, IEmailService emailService)
        {
            _userRepository = userRepository;
            _corredorRepository = corredorRepository;   
            _config = config;
            _mapper = mapper;
            _emailService = emailService;
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
            if (user.ConfirmedEmail == false)
                return Unauthorized("Email no confirmado");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                return BadRequest("Contraseña incorrecta");

            var userDto = _mapper.Map<UsuarioDto>(user);
            return Ok(userDto);
        }

        //Register. VER COMO PASAR LOS DATOS DEL USER. SI HACER OTRO EP APARTE
        [HttpPost("register")]
        public async Task<IActionResult> RegisterCorredor([FromForm] RegisterDto request)
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

                    ImagenURL = "/Imagenes/profile/" + fileName;
                }
                else
                {
                    // Asignar una imagen por defecto
                    ImagenURL = "/Imagenes/profile/user-empty.png";     
                }

                // Mapear los datos del DTO a la entidad de Corredor
          


                


                var user = _mapper.Map<Corredor>(request);
                user.Imagen = ImagenURL;


                

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.RolID = 1; // ROL USUARIO-Corredor
               
                //Seteo para verificar cuenta
                var token = Guid.NewGuid().ToString();
                user.ConfirmedEmail = false;
                user.ConfirmationToken = token;
                var confirmationLink = $"https://localhost:7296/api/Auth/confirm-email?token={token}&email={user.Email}";

                // Cargar la plantilla HTML
                string emailHtmlTemplate = System.IO.File.ReadAllText("Services/activation.html");

                // Reemplazar los valores dinámicos
                emailHtmlTemplate = emailHtmlTemplate.Replace("https://example.com/confirmacion?token=123456", confirmationLink);

                await _emailService.SendEmailAsync(user.Email, "Activa tu cuenta",emailHtmlTemplate);

                var result = await _corredorRepository.CreateCorredor(user);    

                return Ok(result.ID);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);  
            }

        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            try
            {
                
                await _userRepository.ConfirmEmailAsync(email, token);
                var redirectUrl = "http://localhost:4200/confirmacionCuenta";
                return Redirect(redirectUrl);
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromQuery] string email) 
        {
            try
            {
                var PasswordResetToken =   await _userRepository.RequestPasswordResetAsync(email);

                // Enviar correo de restablecimiento de contraseña
                string resetLink = $"http://localhost:4200/reset-password?token={PasswordResetToken}&email={email}";

                string emailHtmlTemplate = System.IO.File.ReadAllText("Services/recuperacion.html");

                // Reemplazar los valores dinámicos
                emailHtmlTemplate = emailHtmlTemplate.Replace("https://example.com/reset-password?token=123456", resetLink);


                await _emailService.SendEmailAsync(email, "Restablecer tu contraseña",
                    emailHtmlTemplate);
                
                
                return Ok("Si existe una cuenta con ese correo electrónico, se ha enviado un enlace de restablecimiento de contraseña.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            try
            {
                await _userRepository.ResetPasswordAsync(model.Email, model.Token, model.NewPassword);
                return Ok("Contraseña restablecida con éxito.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto model)
        {
            try
            {
                // Obtener el usuario por su email
                var user = await _userRepository.GetUsuarioByEmail(model.Email);

                if (user == null)
                {
                    return BadRequest("Usuario no encontrado");
                }

                // Verificar que la contraseña actual sea correcta
                if (!BCrypt.Net.BCrypt.Verify(model.CurrentPassword, user.Password))
                {
                    return BadRequest("La contraseña actual es incorrecta");
                }

                // Hash de la nueva contraseña
                var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

                // Actualizar la contraseña del usuario
                await _userRepository.ChangePasswordAsync(user.Email, newPasswordHash);

                return Ok("Contraseña cambiada con éxito");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
