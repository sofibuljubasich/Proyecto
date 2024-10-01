using BE.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

using BE.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class WebhookController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> ReceiveWebhook()
    {
        // Leer el cuerpo de la solicitud
        string requestBody = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        // Verificar que el cuerpo de la solicitud no esté vacío
        if (string.IsNullOrWhiteSpace(requestBody))
        {
            return BadRequest("El cuerpo de la solicitud está vacío.");
        }

        // Intentar deserializar el JSON
        dynamic webhookEvent;
        try
        {
            webhookEvent = JsonConvert.DeserializeObject<dynamic>(requestBody);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error al deserializar el cuerpo de la solicitud: {ex.Message}");
        }

        // Verificar que los campos necesarios no sean nulos
        if (webhookEvent == null || webhookEvent.type == null || webhookEvent.data == null || webhookEvent.data.id == null)
        {
            return BadRequest("El evento recibido es inválido o faltan campos requeridos.");
        }

        // Parsear los valores
        string eventType = webhookEvent.type;
        long eventId = webhookEvent.data.id;

        // Procesar el evento según el tipo
        switch (eventType)
        {
            case "payment":
                await ProcessPaymentEvent(eventId);
                break;
            default:
                return BadRequest($"Tipo de evento no soportado: {eventType}");
        }

        // Responder con 200 OK
        return Ok();
    }

    private async Task ProcessPaymentEvent(long paymentId)
    {
        // Llamar a la API de Mercado Pago para obtener los detalles del pago
        string url = $"https://api.mercadopago.com/v1/payments/{paymentId}";
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer APP_USR-XXXXXX");

        var response = await client.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        var paymentDetails = JsonConvert.DeserializeObject<dynamic>(responseBody);

        // Verificar que los detalles del pago no sean nulos
        if (paymentDetails == null || paymentDetails.status == null || paymentDetails.external_reference == null)
        {
            throw new Exception("Error: no se pudieron obtener los detalles del pago.");
        }

        // Verificar el estado del pago
        string status = paymentDetails.status;
        string inscripID = paymentDetails.external_reference;

        if (status == "approved")
        {
            // Registrar inscripcion en BD
            await RegistrarPago(inscripID, "Aprobado");
        }
        else if (status == "pending")
        {
            await RegistrarPago(inscripID, "Pendiente de Aprobación");
        }
        else if (status == "rejected")
        {
            await RegistrarPago(inscripID, "Rechazado");
        }
    }

    private async Task RegistrarPago(string inscripID, string estadoPago)
    {
        using (HttpClient client = new HttpClient())
        {
            string url = $"https://tuservidor/api/ActualizarPago/{inscripID}"; // Cambia por la URL de tu API
            var content = new StringContent($"\"{estadoPago}\"", Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PatchAsync(url, content);

            // Verificar si la llamada al servicio fue exitosa
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error al registrar el pago: {response.ReasonPhrase}");
            }
        }
    }
}
