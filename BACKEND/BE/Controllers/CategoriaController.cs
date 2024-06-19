using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    
        [Route("api/[controller]")]
        [ApiController]
        public class CategoriaController : ControllerBase
        {

            private readonly IMapper _mapper;
            private readonly ICategoriaRepository _categoriaRepository;

            public CategoriaController(IMapper mapper, ICategoriaRepository categoriaRepository)
            {
                _mapper = mapper;
                _categoriaRepository = categoriaRepository;
            }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listCategorias = await _categoriaRepository.GetCategorias();


                return Ok(listCategorias);
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
                var categoria = await _categoriaRepository.GetCategoria(id);

                if (categoria == null)
                {
                    return NotFound();
                }

                
                return Ok(categoria);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Route("evento/{eventoID}")]
        public async Task<IActionResult> GetCategoriasByEvento(int eventoID)
        {
            try 
            { 
                var categorias = await _categoriaRepository.GetCategoriasByEvento(eventoID);   
                
                var categoriasDto = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);  

                return Ok(categoriasDto);  
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
                var categoria = await _categoriaRepository.GetCategoria(id);

                if (categoria == null)
                {
                    return NotFound();
                }

                await _categoriaRepository.DeleteCategoria(categoria);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoriaCreateUpdateDto categoriaDto)
        {
            try
            {
                var categoria = _mapper.Map<Categoria>(categoriaDto);

                categoria = await _categoriaRepository.Create(categoria);


                return CreatedAtAction("Get", new { id = categoria.ID }, categoria);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //ACOMODAR
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CategoriaCreateUpdateDto categoriaDto)
        {
            try
            {
                var categoria = _mapper.Map<Categoria>(categoriaDto);

                if (id != categoria.ID)
                {
                    return BadRequest();
                }

                var catItem = await _categoriaRepository.GetCategoria(id);

                if (catItem == null)
                {
                    return NotFound();
                }

                await _categoriaRepository.UpdateCategoria(categoria);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    
    
    }
}
