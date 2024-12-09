using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CorredorController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ICorredorRepository _corredorRepository;  
        private readonly IMapper _mapper;



        public CorredorController(ICorredorRepository corredorRepository, IConfiguration config,IMapper mapper)
        {
            _corredorRepository = corredorRepository;   
            _config = config;
            _mapper = mapper;
        }
        [HttpGet("existe/{dni}")]
public async Task<IActionResult> ExisteUsuarioConDNI(string dni)
{
            bool existe = await _corredorRepository.ExisteCorredorConDNI(dni);  

    return Ok(existe);
}

        [HttpPost("UploadImage")]
        public async Task<IActionResult> GuardarImagen([FromForm] IFormFile? imagen, [FromForm] int corredorID)
        {
            try
            {
                string ImagenURL;

                if (imagen != null && imagen.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imagen.FileName);
                    var path = Path.Combine("wwwroot/imagenes/profile", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await imagen.CopyToAsync(stream);
                    }

                    ImagenURL = "/Imagenes/profile/" + fileName;
                }
                else
                {
                    // Asignar una imagen por defecto
                    ImagenURL = "/Imagenes/profile/user-empty.jpg";
                }

                await _corredorRepository.CargarImagen(ImagenURL, corredorID);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{Dni}")]
        public async Task<IActionResult> GetByDni(string Dni)
        {
            try
            {
                var corredor = await _corredorRepository.GetCorredorByDni(Dni);

                if (corredor == null)
                {
                    return NotFound();
                }

                var corredorDto = _mapper.Map<CorredorGetDto>(corredor);

                

                return Ok(corredorDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCorredor/{corredorID}")]
        public async Task<IActionResult> Get(int corredorID)
        {
            try
            {
                var corredor = await _corredorRepository.GetCorredor(corredorID);

                if (corredor == null)
                {
                    return NotFound();
                }

                var corredorDto = _mapper.Map<CorredorGetDto>(corredor);



                return Ok(corredorDto);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{corredorID}")]
        public async Task<IActionResult> Update(int corredorID, [FromBody]CorredorUpdateDto updateDto)
        {
            try
            {

                var corredor = await _corredorRepository.GetCorredor(corredorID);


                if (corredor == null)
                {
                    return NotFound();
                }

                string ImagenURL;

                if (!string.IsNullOrEmpty(updateDto.Email)) corredor.Email = updateDto.Email;
                if (!string.IsNullOrEmpty(updateDto.Nombre)) corredor.Nombre = updateDto.Nombre;
                if (!string.IsNullOrEmpty(updateDto.Apellido)) corredor.Apellido = updateDto.Apellido;
               
                if (updateDto.FechaNacimiento.HasValue) corredor.FechaNacimiento = updateDto.FechaNacimiento.Value;
                if (!string.IsNullOrEmpty(updateDto.Telefono)) corredor.Telefono = updateDto.Telefono;
                if (!string.IsNullOrEmpty(updateDto.Localidad)) corredor.Localidad = updateDto.Localidad;
                if (!string.IsNullOrEmpty(updateDto.Dni)) corredor.Dni = updateDto.Dni;
                if (!string.IsNullOrEmpty(updateDto.Genero)) corredor.Genero = updateDto.Genero;
                if (!string.IsNullOrEmpty(updateDto.ObraSocial)) corredor.ObraSocial = updateDto.ObraSocial;

                if (updateDto.Imagen != null && updateDto.Imagen.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(updateDto.Imagen.FileName);
                    var path = Path.Combine("wwwroot/imagenes/profile", fileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await updateDto.Imagen.CopyToAsync(stream);
                    }

                    ImagenURL = "/Imagenes/profile/" + fileName;

                    corredor.Imagen = ImagenURL;
                }




                await _corredorRepository.UpdateCorredor(corredor);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
