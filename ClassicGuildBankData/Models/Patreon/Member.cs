using System;
using System.Collections.Generic;
using System.Text;

namespace ClassicGuildBankData.Models.Patreon
{
    public class Member
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }
        public Tier[] EntitledTiers { get; set; }
    }
}
