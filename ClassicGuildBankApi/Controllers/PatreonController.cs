using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using ClassicGuildBankData.Data;
using ClassicGuildBankData.Models;
using ClassicGuildBankData.Models.Patreon;
using ClassicGuildBankData.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SupplierImport.Controllers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClassicGuildBankApi.Controllers
{
    [Route("api/[controller]")]
    public class PatreonController : ApiController
    {
        //private readonly IConfiguration _config;
        //private HttpClient http = new HttpClient();
        private readonly PatreonRepository _patreonRepository;

        public PatreonController(PatreonRepository patreonRepository, UserManager<ClassicGuildBankUser> userManager, GuildBankRepository repository) 
            : base(userManager, repository)
        {
            //_config = config;
            _patreonRepository = patreonRepository;
        }

        // GET: api/<controller>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("callback")]
        public async Task<IActionResult> Callback([FromQuery]string code)
        {
            try
            {
                var token = await _patreonRepository.GetAccessToken(code);

                if (token.HasError)
                    return StatusCode(token.StatusCode, token.ErrorMessage);

                var result = await _patreonRepository.UpdateUserToken(token, ClassicGuildBankUser);
                if (result.Succeeded && !string.IsNullOrEmpty(ClassicGuildBankUser.Patreon_Id))
                    return Ok(ClassicGuildBankUser.Patreon_Id);

                return BadRequest(string.Join(',', result.Errors.Select(e => e.Description)));
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(ClassicGuildBankUser.Patreon_Id);
        }

        //[HttpGet]
        //public IActionResult PledgeLevel()
        //{
        //    http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", ClassicGuildBankUser.PatreonAccessToken);
        //}


    }
}
