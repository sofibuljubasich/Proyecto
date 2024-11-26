using BE.Dto;

namespace BE.Services
{
    public interface IReporteService
    {
        Task<ReporteEventoDTO> ObtenerReporteEvento(int eventoID);
        Task<ReporteGlobalDTO> ObtenerReporteGlobal();
    }

}
