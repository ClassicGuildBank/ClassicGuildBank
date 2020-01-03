using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class GuildMemberViewModel
    {
        public string DisplayName { get; set; }
        public bool CanUpload { get; set; }
        public string UserId { get; set; }
        public Guid GuildId { get; set; }
    }
}
