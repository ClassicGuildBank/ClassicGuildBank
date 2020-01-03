using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class ClassicGuildBankUser : IdentityUser
    {
        #region Properties

        public Guid LastSelectedGuildId { get; set; } 

        #endregion
        public string PatreonAccessToken { get; set; }
        public string PatreonRefreshToken { get; set; }
        public int PatreonExpiration { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string Patreon_Id { get; set; }
    }
}
