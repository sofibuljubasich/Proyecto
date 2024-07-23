using AutoMapper;
using BE.Dto;
using BE.Models;

namespace BE.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Evento, EventoCreateDto>().ReverseMap();
            CreateMap<Evento, EventoRespuestaDto>().ReverseMap();

            CreateMap<TipoEvento, TipoEventoCreateUpdateDto>().ReverseMap();
            CreateMap<TipoEvento, TipoEventoDto>().ReverseMap();

            CreateMap<Usuario, LoginDto>().ReverseMap();
            CreateMap<Usuario, RegisterDto>().ReverseMap();
            CreateMap<Usuario, UsuarioDto>().ReverseMap();  

            CreateMap<Corredor, RegisterDto>().ReverseMap();
            CreateMap<Corredor, CorredorGetDto>().ReverseMap();

            CreateMap<Voluntario, VoluntarioDto>().ReverseMap();
            CreateMap<Voluntario,VoluntarioCreateDto>().ReverseMap(); 
                 

            CreateMap<Categoria, CategoriaDto>().ReverseMap();
            CreateMap<Categoria, CategoriaCreateUpdateDto>().ReverseMap();  

            CreateMap<Distancia, DistanciaDto>().ReverseMap();
            CreateMap<Distancia,DistanciaCreateUpdateDto>().ReverseMap();
            CreateMap<EventoDistancia,DistanciaDto>().ReverseMap(); 

            CreateMap<EventoDistancia,EventoDistanciaDto>().ReverseMap();   
            CreateMap<EventoDistancia,EventoDistanciaUpdateDto>().ReverseMap();

            CreateMap<Inscripcion, ResultadoDto>().ReverseMap();    
            CreateMap<Inscripcion, InscripcionCreateDto>().ReverseMap();
            CreateMap<Inscripcion, InscripcionDto>().ReverseMap();

            CreateMap<Comentario,ComentarioCreateDto>().ReverseMap();
            CreateMap<Comentario, ComentarioDto>().ReverseMap();

            CreateMap<Tarea,TareaCreateUpdateDto>().ReverseMap();
            CreateMap<Tarea, TareaDto>().ReverseMap();
            


        }
    }
}
