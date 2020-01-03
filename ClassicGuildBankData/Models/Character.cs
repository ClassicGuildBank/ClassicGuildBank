using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class Character
    {
        [JsonIgnore]
        public Guid Id { get; set; }

        [NotMapped]
        [JsonProperty("id")]
        public string _Id { get => Id.ToString(); set => Id = new Guid(value); }

        public string Name { get; set; }

        public DateTime? LastUpdated { get; set; }

        public int Gold { get; set; }

        [JsonIgnore]
        public Guid GuildId { get; set; }

        [NotMapped]
        [JsonProperty("guildId")]
        public string _GuildId { get => GuildId.ToString(); set => GuildId = new Guid(value); }

        private List<Bag> _bags;
        public List<Bag> Bags 
        {
            get
            {
                if (_bags == null)
                    _bags = new List<Bag>();

                return _bags;
            }
            set
            {
                _bags = value;
            }
        }

        [JsonIgnore]
        public Guild Guild { get; set; }
    }
}
