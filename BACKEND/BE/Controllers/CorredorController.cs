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



        [HttpGet("{corredorID}")]
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
        public async Task<IActionResult> Update(int corredorID, [FromBody]CorredorUpdateDto corredorDto)
        {
            try
            {

                var corredor = await _corredorRepository.GetCorredor(corredorID);

                if (corredor == null)
                {
                    return NotFound();
                }





                await _corredorRepository.UpdateCorredor(corredor);

                return Ok("Corredor actualizada");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
