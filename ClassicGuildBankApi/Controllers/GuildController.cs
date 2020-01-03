using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ClassicGuildBankData.Data;
using ClassicGuildBankData.Models;
using ClassicGuildBankData.Repositories;
using ClassicGuildBankData.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SupplierImport.Controllers;

namespace ClassicGuildBankApi.Controllers
{
    [Route("api/[controller]")]
    public partial class GuildController : ApiController
    {
        #region Constructor

        public GuildController(UserManager<ClassicGuildBankUser> userManager, GuildBankRepository repository)
            : base(userManager, repository)
        {
        }

        #endregion

        #region Public Methods

        //[HttpGet("GetGuild/{guildId}")]
        //public IActionResult GetGuild(Guid guildId)
        //{
        //    var guild = _guildBankRepository.GetGuildWithGuildBank(guildId, ClassicGuildBankUser);

        //    if (guild == null)
        //        return BadRequest(GetErrorMessageObject("Unable to get Guild"));

        //    return new JsonResult(guild);
        //}

        [HttpGet("GetGuilds")]
        public IActionResult GetGuilds()
        {
            var guilds = _guildBankRepository.GetGuilds(ClassicGuildBankUser).ToList();

            return new JsonResult(guilds);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddGuildModel addGuildModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(GetErrorMessageObject(GetModelStateErrors()));

                var guild = _guildBankRepository.AddGuild(addGuildModel, ClassicGuildBankUser);

                return new JsonResult(guild);
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Failed to Add Guild"));
            }
        }

        [HttpPost("RenameGuild")]
        public IActionResult RenameGuild([FromBody]RenameGuildModel renameGuildModel)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(GetErrorMessageObject(GetModelStateErrors()));

                _guildBankRepository.RenameGuild(renameGuildModel, ClassicGuildBankUser);

                return Ok();
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Failed to Rename Guild"));
            }
        }

        [HttpDelete("{guildId}")]
        public IActionResult Delete(Guid guildId)
        {
            try
            {
                _guildBankRepository.DeleteGuild(guildId, ClassicGuildBankUser);

                return Ok();
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Failed to Delete Guild"));
            }
        }

        [HttpDelete("DeleteCharacterFromGuild/{guildId}/{characterId}")]
        public IActionResult DeleteCharacterFromGuild(Guid guildId, Guid characterId)
        {
            try
            {
                _guildBankRepository.DeleteCharacter(guildId, characterId, ClassicGuildBankUser);

                return Ok();
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Failed to Delete Character"));
            }
        }

        [HttpPost("RemoveMemberFromGuild/{guildId}/{userId}")]
        public IActionResult RemoveMemberFromGuild(Guid guildId, string userId)
        {
            try
            {
                _guildBankRepository.RemoveMemberFromGuild(guildId, userId, ClassicGuildBankUser);

                return Ok();
            }
            catch(GuildBankRepository.CannotRemoveOwnerFromGuildException)
            {
                return BadRequest(GetErrorMessageObject("Unable to Remove Owner From Guild"));
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Remove Member From Guild"));
            }
        }

        [HttpPost("RemoveSelfFromGuild/{guildId}")]
        public IActionResult RemoveSelfFromGuild(Guid guildId)
        {
            try
            {
                _guildBankRepository.RemoveSelfFromGuild(guildId, ClassicGuildBankUser);

                return Ok();
            }
            catch (GuildBankRepository.CannotRemoveOwnerFromGuildException)
            {
                return BadRequest(GetErrorMessageObject("Unable to Remove Owner From Guild"));
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Remove Member From Guild"));
            }
        }

        [HttpPost("ToggleUploadAccess/{guildId}/{userId}")]
        public IActionResult ToggleUploadAccess(Guid guildId, string userId)
        {
            try
            {
                _guildBankRepository.ToggleUploadAccess(guildId, userId, ClassicGuildBankUser);

                return Ok();
            }
            catch (GuildBankRepository.CannotRemoveOwnerFromGuildException)
            {
                return BadRequest(GetErrorMessageObject("Unable to Revoke Upload Access From Guild Owner"));
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Toggle Upload Access"));
            }
        }

        [HttpPost("UpdateLastSelectedGuild/{guildId}")]
        public async Task<IActionResult> UpdateLastSelectedGuild(Guid guildId)
        {
            try
            {
                ClassicGuildBankUser.LastSelectedGuildId = guildId;

                await _userManager.UpdateAsync(ClassicGuildBankUser);

                return Ok();
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Update Last Selected Guild"));
            }
        }

        [HttpPatch("UpdateInviteLink/{guildId}")]
        public IActionResult UpdateInviteLink(Guid guildId)
        {
            try
            {
                var guild = _guildBankRepository.UpdateGuildInviteLink(guildId, ClassicGuildBankUser);
                return new JsonResult(guild);
            }
            catch(Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpPatch("UpdatePublicLink/{guildId}/{enabled}")]
        public IActionResult UpdatePublicLink(Guid guildId, bool enabled)
        {
            try
            {
                var guild = _guildBankRepository.UpdateGuildPublicLink(guildId, ClassicGuildBankUser, enabled);
                return new JsonResult(guild);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpGet("GetFromToken/{token}")]
        public IActionResult GetFromToken(string token)
        {
            try
            {
                var guild = _guildBankRepository.GetGuildFromToken(token);
                if (guild != null)
                    return new JsonResult(guild);

                return BadRequest(new { errorMessage = "Failed to Locate Guild" });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetFromReadonlyToken/{token}")]
        public IActionResult GetFromReadonlyToken(string token)
        {
            try
            {
                var guild = _guildBankRepository.GetGuildFromReadonlyToken(token);
                if (guild != null && guild.PublicLinkEnabled)
                    return new JsonResult(guild);

                if (guild != null && !guild.PublicLinkEnabled)
                    return BadRequest(new { errorMessage = $"Public Link Disabled" });
                
                return BadRequest(new { errorMessage = "Failed to Locate Guild" });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpPatch("JoinGuild/{guildId}")]
        public async Task<IActionResult> JoinGuild(Guid guildId)
        {
            var guild = _guildBankRepository.GetGuild(guildId);
            var member = _guildBankRepository.AddGuildMember(guildId, ClassicGuildBankUser);

            ClassicGuildBankUser.LastSelectedGuildId = guildId;
            await _userManager.UpdateAsync(ClassicGuildBankUser);

            return Ok(guild);
        }

        [HttpGet("GuildMembers/{guildId}")]
        public IActionResult GetGuildMembers(Guid guildId)
        {
            try
            {
                return Ok(_guildBankRepository.GetGuildMembers(guildId, ClassicGuildBankUser));
            }
            catch(Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpGet("GuildMembership")]
        public IActionResult GetGuildMembership()
        {
            try
            {
                return Ok(_guildBankRepository.GetGuildMembership(ClassicGuildBankUser.Id));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpPost("GuildMembership")]
        public IActionResult UpdateGuildMembership([FromBody]GuildMembershipViewModel model)
        {
            try
            {
                return Ok(_guildBankRepository.UpdateGuildMembership(model));
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpPost("UploadImportString/{guildId}")]
        public IActionResult UploadImportString(Guid guildId, [FromBody]UploadImportStringViewModel uploadImportStringViewModel)
        {
            try
            {
                CharacterImporter.ImportCharacter
                (
                    _guildBankRepository,
                    ClassicGuildBankUser,
                    guildId, 
                    uploadImportStringViewModel.EncodedImportString
                );

                return Ok();
            }
            catch(GuildBankRepository.UserCannotUploadException)
            {
                return BadRequest(new { errorMessage = "User does not have access to upload to this guild." });
            }
            catch
            {
                return BadRequest(new { errorMessage = "Unable to upload import string." });
            }
        }

        [HttpGet("GetTransactions/{guildId}")]
        public IActionResult GetTransactions(Guid guildId, [FromQuery]int? page, [FromQuery]int? pageSize)
        {
            try
            {
                page = page ?? 1;
                pageSize = pageSize ?? 100;

                var transactions = _guildBankRepository.GetPageOfTransactions(guildId, page.Value, pageSize.Value).ToList();

                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpGet("GetTransactionCount/{guildId}")]
        public IActionResult GetTransactionCount(Guid guildId)
        {
            return Ok(_guildBankRepository.GetTransactionCount(guildId));
        }

        [HttpPost("RequestItems")]
        public IActionResult RequestItems([FromBody]RequestItemsModel requestItemsModel)
        {
            try
            {
                //signal r to push item request count?

                if (!ModelState.IsValid)
                    return BadRequest(GetErrorMessageObject(GetModelStateErrors()));

                _guildBankRepository.AddItemRequest(requestItemsModel, ClassicGuildBankUser);

                return Ok();
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Failed to Request Items"));
            }
        }

        [HttpGet("GetItemRequests/{guildId}")]
        public IActionResult GetItemRequests(Guid guildId)
        {
            try
            {
                //needs paging

                var itemRequests = _guildBankRepository.GetItemRequestsForGuild(guildId).ToList();

                return Ok(itemRequests);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpGet("GetMyItemRequests/{guildId}")]
        public IActionResult GetMyItemRequests(Guid guildId)
        {
            try
            {
                var itemRequests = _guildBankRepository.GetMyItemRequests(guildId, ClassicGuildBankUser).ToList();

                return Ok(itemRequests);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.StackTrace);
            }
        }

        [HttpPost("ApproveItemRequest/{guildId}/{itemRequestId}")]
        public IActionResult ApproveItemRequest(Guid guildId, Guid itemRequestId )
        {
            try
            {
                _guildBankRepository.ApproveItemRequest(itemRequestId, guildId, ClassicGuildBankUser);

                return Ok();
            }
            catch (GuildBankRepository.UserCannotProcessItemRequestsException)
            {
                return BadRequest(new { errorMessage = "User does not have access to process upload requests for this guild." });
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Approve Item Request"));
            }
        }

        [HttpPost("DenyItemRequest/{guildId}/{itemRequestId}")]
        public IActionResult DenyItemRequest(Guid guildId, Guid itemRequestId)
        {
            try
            {
                _guildBankRepository.DenyItemRequest(itemRequestId, guildId, ClassicGuildBankUser);

                return Ok();
            }
            catch (GuildBankRepository.UserCannotProcessItemRequestsException)
            {
                return BadRequest(new { errorMessage = "User does not have access to process upload requests for this guild." });
            }
            catch
            {
                return BadRequest(GetErrorMessageObject("Unable to Deny Item Request"));
            }
        }

        #endregion
    }
}
