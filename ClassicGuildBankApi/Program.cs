using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClassicGuildBankData.Data;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace SSIndustrialApi
{
    public class Program
    {
        #region Public Methods

        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            SeedDatabase(host);

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((hostContext, config) => 
                {
                    config.Sources.Clear();
                    config.AddJsonFile("appsettings.json");
                    //config.AddJsonFile($"appsettings.{environment}.json");
                    config.AddEnvironmentVariables();
                });
        }

        #endregion

        #region Private Methods

        private static void SeedDatabase(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                try
                {
                    var seeder = scope.ServiceProvider.GetService<ClassicGuildBankSeeder>();
                    seeder.Seed().GetAwaiter().GetResult();
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }
        }

        #endregion
    }
}
