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
            CreateMap<Evento, EventoCreateUpdateDto>().ReverseMap();

            CreateMap<Usuario, LoginDto>().ReverseMap();
            CreateMap<Usuario, RegisterDto>().ReverseMap();
            CreateMap<Usuario, VoluntarioDto>().ReverseMap();

            CreateMap<Categoria, CategoriaDto>().ReverseMap();
            CreateMap<Distancia, DistanciaDto>().ReverseMap();

            CreateMap<Inscripcion, ResultadoDto>().ReverseMap();    
            CreateMap<Inscripcion, InscripcionCreateDto>().ReverseMap();       
            
            CreateMap<Comentario,ComentarioCreateDto>().ReverseMap();
            CreateMap<Comentario, ComentarioDto>().ReverseMap();
            


        }
    }
}
