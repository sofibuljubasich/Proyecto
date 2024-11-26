using BE.Repository;

namespace BE.Services
{
    public class EventoService: BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<EventoService> _logger;

        public EventoService(IServiceScopeFactory serviceScopeFactory, ILogger<EventoService> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceScopeFactory.CreateScope())
                    {
                        var eventoService = scope.ServiceProvider.GetRequiredService<EventoRepository>();
                        await eventoService.ActualizarEstadoEventosAsync();
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error al actualizar el estado de los eventos.");
                }

                // Esperar 24 horas antes de la siguiente ejecución
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }

}

