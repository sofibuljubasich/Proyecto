using BE.Models;
using BE.Services;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

public class EmailService : IEmailService
{
    private readonly EmailConfiguration
        _emailSettings;

    public EmailService(IOptions<EmailConfiguration> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(_emailSettings.SenderEmail);
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;

        var builder = new BodyBuilder
        {
            HtmlBody = body
        };
        email.Body = builder.ToMessageBody();

        using var smtp = new SmtpClient();
        smtp.Connect(_emailSettings.Host, _emailSettings.Port, _emailSettings.UseSSL);
        smtp.Authenticate(_emailSettings.Username, _emailSettings.Password);

        await smtp.SendAsync(email);
        smtp.Disconnect(true);
    }
}