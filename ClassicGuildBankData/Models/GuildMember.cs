using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class GuildMember
    {
        public string UserId { get; set; }

        [JsonIgnore]
        public Guid GuildId { get; set; }

        [NotMapped]
        [JsonProperty("guildId")]
        public string _GuildId { get => GuildId.ToString(); set => GuildId = new Guid(value); }

        public string DisplayName { get; set; }

        public bool CanUpload { get; set; }

        [JsonIgnore]
        public Guild Guild { get; set; }
    }
}
