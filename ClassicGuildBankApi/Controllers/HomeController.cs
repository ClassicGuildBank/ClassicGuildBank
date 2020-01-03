using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClassicGuildBankApi.Controllers
{
    
    public class HomeController : Controller
    {
        #region Public Methods

        public IActionResult Index()
        {
            return View();
        }

        #endregion
    }
}
