using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoluntarioController: ControllerBase
    {
        private readonly IVoluntarioRepository _voluntarioRepository;
        private readonly IMapper _mapper;

        public VoluntarioController(IVoluntarioRepository voluntarioRepository,IMapper mapper) 
        {
            _voluntarioRepository = voluntarioRepository;
            _mapper = mapper;   
        }

        [HttpPost("register")]
        public async Task<IActionResult> CrearVoluntario([FromBody] VoluntarioCreateDto request)
        {
            try
            {

                var voluntarioByEmail = _voluntarioRepository.CheckIfExists(request.Email);
                if (voluntarioByEmail is true)
                    return BadRequest("Voluntario ya registrado");



                var voluntario = _mapper.Map<Voluntario>(request);



                //await _emailSender.SendEmailAsync(user.Username, user.Password);

                voluntario.Password = BCrypt.Net.BCrypt.HashPassword(voluntario.Password);
                voluntario.RolID = 3; // ROL Voluntario
                var result = await _voluntarioRepository.Create(voluntario);

                return Ok("Voluntario creado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet, Route("tareas/{voluntarioID}")]
        public async Task<IActionResult> GetByVoluntario(int voluntarioID)
        {
            try
            {
                var listTareas = await _voluntarioRepository.GetTareasByVoluntario(voluntarioID);

                if (listTareas == null)
                {
                    return NotFound("El voluntario no tiene tareas asignadas");
                }

                return Ok(listTareas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listVoluntarios = await _voluntarioRepository.GetAll();

                var listVoluntariosDto = _mapper.Map<List<VoluntarioDto>>(listVoluntarios);



                return Ok(listVoluntariosDto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("voluntarioID")]
        public async Task<IActionResult> Delete(int voluntarioID) 
        {
            try
            {
                var voluntario = await _voluntarioRepository.Get(voluntarioID);


                if (voluntario == null)
                {
                    return NotFound();
                }

                await _voluntarioRepository.Delete(voluntario);

                return Ok("Voluntario eliminada");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }



        }




    }
}
