using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ClassicGuildBankData.Data;
using ClassicGuildBankData.Models;
using ClassicGuildBankData.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SupplierImport.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ApiController : Controller
    {
        #region Data Members

        protected readonly GuildBankRepository _guildBankRepository;

        protected readonly UserManager<ClassicGuildBankUser> _userManager;

        #endregion

        #region Properties  

        private ClassicGuildBankUser _classicGuildBankUser;
        public ClassicGuildBankUser ClassicGuildBankUser
        {
            get
            {
                return _classicGuildBankUser;
            }
        }

        #endregion

        #region Constructor

        public ApiController
        (
            UserManager<ClassicGuildBankUser> userManager, 
            GuildBankRepository guildBankRepository
        )
        {
            _userManager = userManager;
            _guildBankRepository = guildBankRepository;
        }

        #endregion

        #region Public Methods

        [HttpGet("GetCharacters/{guildId}")]
        public IActionResult GetCharacters(string guildId)
        {
            var characters = _guildBankRepository.GetCharacters(new Guid(guildId), ClassicGuildBankUser);

            return new JsonResult(characters);
        }

        [HttpGet("GetItemList/{guildId}")]
        public IActionResult GetItemList(string guildId)
        {
            var itemList = _guildBankRepository.GetItemList(new Guid(guildId));

            return new JsonResult(itemList);
        }

        #endregion

        #region Protected Methods

        protected object GetErrorMessageObject(string errorMessage)
        {
            return new
            {
                errorMessage
            };
        }

        protected string GetModelStateErrors()
        {
            return String.Join(Environment.NewLine, ModelState.Values.SelectMany(value => value.Errors).Select(error => error.ErrorMessage));
        }

        #endregion

        #region Overrides

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (User.Identity.Name != null)
                _classicGuildBankUser = _userManager.FindByNameAsync(User.Identity.Name).Result;

            base.OnActionExecuting(context);
        }

        #endregion
    }
}