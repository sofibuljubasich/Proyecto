﻿using AutoMapper;
using BE.Dto;
using BE.Interfaces;
using BE.Models;
using BE.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IComentarioRepository _comentarioRepository;   
        private readonly IInscripcionRepository _inscripcionRepository;

        public ComentarioController(IMapper mapper, IComentarioRepository comentarioRepository, IInscripcionRepository inscripcionRepository)
        {
            _mapper = mapper;
            _comentarioRepository = comentarioRepository;
            _inscripcionRepository = inscripcionRepository; 
        }

        [HttpPost]
        public async Task<IActionResult> Create(ComentarioCreateDto comentarioDto)
        {
            try
            {
                var comentario = _mapper.Map<Comentario>(comentarioDto);

                var inscripcionUsuario = await _inscripcionRepository.CheckIfExists(comentarioDto.CorredorID, comentarioDto.EventoID);

                if (inscripcionUsuario == null)
                {
                    return BadRequest("El corredor no participó del evento");
                }



                var new_comentario = await _comentarioRepository.Create(comentario);


                return CreatedAtAction("Get", new { id = new_comentario.ID });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetByEvento(int eventoID)
        {
            try 
            { 
                var listComentarios = await _comentarioRepository.GetAllByEvento(eventoID); 

                var listComentariosDto = _mapper.Map<IEnumerable<ComentarioDto>>(listComentarios);

                return Ok(listComentariosDto);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        
        
        }
    
    
    }
}