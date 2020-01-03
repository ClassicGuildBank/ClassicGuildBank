using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class RenameGuildModel
    {
        #region Properties

        [Required]
        public Guid GuildId
        {
            get;
            set;
        }

        [Required]
        public string GuildName
        {
            get;
            set;
        }

        #endregion
    }
}
