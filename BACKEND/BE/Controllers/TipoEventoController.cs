using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TipoEventoController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly ITipoEventoRepository _tipoEventoRepository;

        public TipoEventoController(IMapper mapper, ITipoEventoRepository tipoEventoRepository)
        {
            _mapper = mapper;
            _tipoEventoRepository = tipoEventoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listTipos = await _tipoEventoRepository.GetTipos();

                var listTiposDto = _mapper.Map<IEnumerable<TipoEventoDto>>(listTipos);



                return Ok(listTiposDto);
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
                var tipo = await _tipoEventoRepository.GetTipoEvento(id);

                if (tipo == null)
                {
                    return NotFound();
                }

                var tipoDto = _mapper.Map<TipoEventoDto>(tipo);


                return Ok(tipoDto);

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
                var tipo = await _tipoEventoRepository.GetTipoEvento(id);

                if (tipo == null)
                {
                    return NotFound();
                }

                await _tipoEventoRepository.DeleteTipoEvento(tipo);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TipoEventoCreateUpdateDto tipoDto)
        {
            try
            {
                var tipo = _mapper.Map<TipoEvento>(tipoDto);

                tipo = await _tipoEventoRepository.Create(tipo);


                return CreatedAtAction("Get", new { id = tipo.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //ACOMODAR
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,TipoEventoCreateUpdateDto tipoDto)
        {
            try
            {
                var tipo = _mapper.Map<TipoEvento>(tipoDto);

               

                var tipoItem = await _tipoEventoRepository.GetTipoEvento(id);

                if (tipoItem == null)
                {
                    return NotFound();
                }

                await _tipoEventoRepository.UpdateTipoEvento(tipo);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
