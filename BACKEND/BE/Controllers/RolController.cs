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
    public class RolController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRolRepository _rolRepository;

        public RolController(IMapper mapper, IRolRepository rolRepository)
        {

            _mapper = mapper;
            _rolRepository = rolRepository; 
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listRol = await _rolRepository.GetRoles();  

                

                return Ok(listRol);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var rol = await _rolRepository.GetRol(id);

                if (rol == null)
                {
                    return NotFound();
                }


                return Ok(rol);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var rol = await _rolRepository.GetRol(id);

                if (rol == null)
                {
                    return NotFound();
                }

                await _rolRepository.Delete(rol);       

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(RolCreateUpdateDto rolDto)
        {
            try
            {
                var rol = _mapper.Map<Rol>(rolDto);

                rol = await _rolRepository.Create(rol);


                return CreatedAtAction("Get", new { id = rol.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //ACOMODAR
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, RolCreateUpdateDto rolDto)
        {
            try
            {
                var rol = _mapper.Map<Rol>(rolDto);

                if (id != rol.ID)
                {
                    return BadRequest();
                }

               
                await _rolRepository.Update(rol);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
