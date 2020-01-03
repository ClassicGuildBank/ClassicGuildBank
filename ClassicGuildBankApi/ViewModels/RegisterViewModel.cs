using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.ViewModels
{
    public class RegisterViewModel
    {
        #region Properties

        [Required]
        public string Username
        {
            get;
            set;
        }

        [Required]
        public string Password
        {
            get;
            set;
        }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email
        {
            get;
            set;
        }

        public string GuildToken
        {
            get;
            set;
        }

        #endregion
    }
}
