using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class Guild
    {
        public string UserId { get; set; }

        [JsonIgnore]
        public Guid Id { get; set; }

        [NotMapped]
        [JsonProperty("id")]
        public string _Id { get => Id.ToString(); set => Id = new Guid(value); }

        public string Name { get; set; }

        public string InviteUrl { get; set; }

        public bool PublicLinkEnabled { get; set; }

        public string PublicUrl { get; set; }

        public List<Character> Characters { get; set; }

        public List<GuildMember> GuildMembers { get; set; }

        public List<Transaction> Transactions { get; set; }

        public List<ItemRequest> ItemRequests { get; set; }

        [NotMapped]
        public bool UserIsOwner { get; set; }

        [NotMapped]
        public bool UserCanUpload { get; set; }

        [NotMapped]
        public bool IsSelected { get; set; }
    }
}
