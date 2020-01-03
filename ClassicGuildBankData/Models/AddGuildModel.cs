using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class AddGuildModel
    {
        #region Properties

        [Required]
        public string GuildName
        {
            get;
            set;
        }

        #endregion
    }
}
