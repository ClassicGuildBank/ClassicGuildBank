using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.ViewModels.Auth
{
    public class ConfirmViewModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }

        public string ClientUrl { get; set; }
    }
}
