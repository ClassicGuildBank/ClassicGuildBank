using ClassicGuildBankApi.ViewModels;
using ClassicGuildBankData.Models;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.Tools
{
    public class SendGridService
    {
        private readonly IConfiguration _configuration;
        private readonly RazorService _razorService;

        private readonly string _apiKey;

        public SendGridService(IConfiguration configuration, RazorService razorService)
        {
            _configuration = configuration;
            _apiKey = _configuration.GetSection("SendGrid").GetSection("api_key").Value;
            _razorService = razorService;
        }

        public void SendEmailConfirmationEmail(ClassicGuildBankUser user, string code)
        {
            var client = new SendGridClient(_apiKey);

            var msg = new SendGridMessage()
            {
                From = new EmailAddress("noreply@classicguildbank.com", "Classic Guild Bank"),
                Subject = "Email Confirmation",
                HtmlContent = GetEmailConfirmationEmailMessageHtml(user, code).Result,
            };

            msg.AddTo(user.Email);
            client.SendEmailAsync(msg);
        }

        public void SendPasswordResetEmail(ClassicGuildBankUser user, string code)
        {
            var client = new SendGridClient(_apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("noreply@classicguildbank.com", "Classic Guild Bank"),
                Subject = "Password Reset",
                HtmlContent = GetPasswordResetEmailMessageHtml(user, code).Result,
            };

            msg.AddTo(user.Email);
            client.SendEmailAsync(msg);
        }

        private async Task<string> GetEmailConfirmationEmailMessageHtml(ClassicGuildBankUser user, string code)
        {
            var url = $"{_configuration.GetSection("ClientUrl").Value}/user/confirm";
            var model = new ConfirmEmailViewModel() { Username = user.UserName, Code = code, CallbackUrl = url};

            return await _razorService.RenderView("ConfirmEmailView", model);
        }

        private async Task<string> GetPasswordResetEmailMessageHtml(ClassicGuildBankUser user, string code)
        {
            var url = $"{ _configuration.GetSection("ClientUrl").Value}/user/reset";
            var model = new ConfirmEmailViewModel() { Username = user.UserName, Code = code, CallbackUrl = url};

            return await _razorService.RenderView("ResetPasswordEmailView", model);
        }
    }
}
