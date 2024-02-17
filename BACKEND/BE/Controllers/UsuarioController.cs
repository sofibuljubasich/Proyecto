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



       

       


    

}
}
