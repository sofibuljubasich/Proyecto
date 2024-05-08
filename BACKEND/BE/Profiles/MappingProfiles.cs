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

            CreateMap<Usuario, LoginDto>().ReverseMap();
            CreateMap<Corredor, RegisterDto>().ReverseMap();
            CreateMap<Corredor, CorredorGetDto>().ReverseMap();
            CreateMap<Voluntario, VoluntarioDto>().ReverseMap();

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
