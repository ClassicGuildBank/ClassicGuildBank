using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClassicGuildBankData.Models.Patreon
{
    public class PatreonToken
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }

        public string Scope { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonIgnore]
        public int StatusCode { get; set; }

        [JsonIgnore]
        public string ErrorMessage { get; set; }

        [JsonIgnore]
        public bool HasError { get; set; }
    }
}
