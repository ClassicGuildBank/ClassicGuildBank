using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.ViewModels
{
    public class ConfirmEmailViewModel
    {
        public string Username { get; set; }
        public string Code { get; set; }

        public string CallbackUrl { get; set; }
    }
}
