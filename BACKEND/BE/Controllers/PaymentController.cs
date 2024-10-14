
using System.Net.Http;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BE.Dto;
namespace BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        // Inyectar IHttpClientFactory
        public PaymentController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost]
        [Route("api/payment/create")]
        public async Task<IActionResult> CreatePreference([FromBody] PaymentRequestDto product)
        {
            // Datos de la preferencia de pago recibidos desde el frontend
            var preferenceData = new
            {
                items = new[]
                {
                    new
                    {
                        title = product.Title,
                        quantity = product.Quantity,
                        unit_price = product.UnitPrice
                    }
                },
                back_urls = new
                {
                    success = "http://localhost:4200/pago-exitoso",
                    failure = "https://localhost:4200/pago-rechazado?inscripcion",
                    pending = "https://localhost:4200/pago-pendiente?inscripcion"


                },
                auto_return = "approved",
                external_referencia = product.InscripcionID,
                //notification_url = "https://13c3-2803-9800-98c4-88d3-fdb1-96d8-3d32-ceca.ngrok-free.app/api/Webhook"
            };

            // Crear la solicitud HTTP a Mercado Pago
            string url = "https://api.mercadopago.com/checkout/preferences";
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer APP_USR-45478970418305-091719-b79bcd32d2ff0734b06c20e40b59e4f7-1928410126");

            var content = new StringContent(JsonConvert.SerializeObject(preferenceData), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, content);
            var responseBody = await response.Content.ReadAsStringAsync();

            // Retornar el ID de la preferencia creada
            return Ok(responseBody);
        }




        [HttpGet]
        [Route("api/payment/status")]
        public async Task<IActionResult> GetPaymentStatus([FromQuery] int inscripcionId)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer APP_USR-45478970418305-091719-b79bcd32d2ff0734b06c20e40b59e4f7-1928410126");

            // Obtener los detalles del pago desde la API de Mercado Pago
            var response = await client.GetAsync($"https://api.mercadopago.com/v1/payments/{inscripcionId}");
            var responseBody = await response.Content.ReadAsStringAsync();

            dynamic paymentInfo = JsonConvert.DeserializeObject(responseBody);
            string status = paymentInfo.status;  // Estado del pago (approved, pending, rejected, etc.)


            // Llamar a la API que actualiza el estado de la inscripción
            var actualizarPagoUrl = $"https://localhost:7296/api/Inscripcion/ActualizarPago/{inscripcionId}";
           // $"https://tuservidor/api/ActualizarPago/{inscripcionId}";
            var updateResponse = await client.PatchAsync(
                actualizarPagoUrl,
                new StringContent(JsonConvert.SerializeObject(status), Encoding.UTF8, "application/json")
            );

            if (updateResponse.IsSuccessStatusCode)
            {
                return Ok("Pago aprobado y actualización de inscripción exitosa.");
            }
            else
            {
                return BadRequest("No se pudo actualizar el pago la inscripción.");
            }
        }
          
        

    }
}
