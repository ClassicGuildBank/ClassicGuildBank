using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.Middleware
{
    public class JWTCookieMiddleware
    {
        private readonly RequestDelegate _next;

        public JWTCookieMiddleware( RequestDelegate next )
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var cookie = context.Request.Cookies["access_token"];
            if( cookie != null)
            {
                context.Request.Headers.Append("Authorization", $"Bearer {cookie}");
            }

            await _next.Invoke(context);
        }
    }
}
