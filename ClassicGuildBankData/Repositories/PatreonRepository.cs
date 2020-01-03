using ClassicGuildBankData.Models;
using ClassicGuildBankData.Models.Patreon;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Repositories
{
    public class PatreonRepository
    {
        private readonly IConfiguration _config;
        private readonly UserManager<ClassicGuildBankUser> _userManager;
        private readonly HttpClient _http = new HttpClient();

        public PatreonRepository(IConfiguration config, UserManager<ClassicGuildBankUser> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public async Task<PatreonToken> GetAccessToken(string callbackCode)
        {
            var dictionary = new Dictionary<string, string>();
            dictionary.Add("code", callbackCode);
            dictionary.Add("grant_type", "authorization_code");
            dictionary.Add("client_id", _config.GetSection("Patreon").GetSection("client_id").Value);
            dictionary.Add("client_secret", _config.GetSection("Patreon").GetSection("client_secret").Value);
            dictionary.Add("redirect_uri", _config.GetSection("Patreon").GetSection("redirect_uri").Value);

            var content = new FormUrlEncodedContent(dictionary);
            var response = await _http.PostAsync("https://www.patreon.com/api/oauth2/token", content);

            if (!response.IsSuccessStatusCode)
                return new PatreonToken { HasError = true, ErrorMessage = await response.Content.ReadAsStringAsync(), StatusCode = (int)response.StatusCode };

            return JsonConvert.DeserializeObject<PatreonToken>(await response.Content.ReadAsStringAsync());
        }

        public async Task<IdentityResult> UpdateUserToken(PatreonToken token, ClassicGuildBankUser user)
        {
            user.PatreonAccessToken = token.AccessToken;
            user.PatreonExpiration = token.ExpiresIn;
            user.PatreonRefreshToken = token.RefreshToken;
            user.LastUpdated = DateTime.Now;

            if (String.IsNullOrEmpty(user.Patreon_Id))
            {
                var patreonId = await GetPatreonId(user);
                user.Patreon_Id = patreonId;
            }

           return await _userManager.UpdateAsync(user);

        }

        public async Task<string> GetPatreonId(ClassicGuildBankUser user)
        {
            _http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", user.PatreonAccessToken);
            var userResponse = await _http.GetAsync("https://www.patreon.com/api/oauth2/v2/identity");

            if (!userResponse.IsSuccessStatusCode)
                throw new HttpRequestException(await userResponse.Content.ReadAsStringAsync());

            var userObj = JsonConvert.DeserializeObject<JObject>(await userResponse.Content.ReadAsStringAsync());

            if (userObj == null)
                throw new InvalidOperationException("User Object is null");

            var userData = userObj["data"];

            if (userData == null)
                throw new InvalidOperationException("User Data is null");

            return userData["id"].ToString();

        }

        public bool TokenNeedsRefresh(ClassicGuildBankUser user)
        {
            return DateTime.Today > user.LastUpdated.Value.AddSeconds(user.PatreonExpiration);
        }

        public async Task<PatreonToken> RefreshToken(ClassicGuildBankUser user)
        {
            var dictionary = new Dictionary<string, string>();

            dictionary.Add("grant_type", "refresh_token");
            dictionary.Add("refresh_token", user.PatreonRefreshToken);
            dictionary.Add("client_id", _config.GetSection("Patreon").GetSection("client_id").Value);
            dictionary.Add("client_secret", _config.GetSection("Patreon").GetSection("client_secret").Value);


            var content = new FormUrlEncodedContent(dictionary);
            var response = await _http.PostAsync("https://www.patreon.com/api/oauth2/token", content);

            if (!response.IsSuccessStatusCode)
                return new PatreonToken { ErrorMessage = await response.Content.ReadAsStringAsync(), StatusCode = (int)response.StatusCode };

            return JsonConvert.DeserializeObject<PatreonToken>(await response.Content.ReadAsStringAsync());

        }
    }
}
