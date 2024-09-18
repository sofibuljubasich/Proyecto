using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/[controller]")]
public class WebhookController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> ReceiveWebhook()
    {
        // Leer el cuerpo de la solicitud
        string requestBody = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        // Parsear la información recibida
        var webhookEvent = JsonConvert.DeserializeObject<dynamic>(requestBody);

        // Verificar el tipo de evento recibido (por ejemplo, payment)
        string eventType = webhookEvent.type;
        long eventId = webhookEvent.data.id;

        // Procesar el evento según el tipo
        switch (eventType)
        {
            case "payment":
                await ProcessPaymentEvent(eventId);
                break;
        }

        // Responder con 200 OK
        return Ok();
    }

    private async Task ProcessPaymentEvent(long paymentId)
    {
        // Llamar a la API de Mercado Pago para obtener los detalles del pago
        string url = $"https://api.mercadopago.com/v1/payments/{paymentId}";
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer  APP_USR-45478970418305-091719-b79bcd32d2ff0734b06c20e40b59e4f7-1928410126");

        var response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        var paymentDetails = JsonConvert.DeserializeObject<dynamic>(responseBody);

        // Verificar el estado del pago
        string status = paymentDetails.status;
        if (status == "approved")
        {
            // Lógica para manejar un pago aprobado
        }
        else if (status == "pending")
        {
            // Lógica para pagos pendientes
        }
        else if (status == "rejected")
        {
            // Lógica para pagos rechazados
        }
    }
}
