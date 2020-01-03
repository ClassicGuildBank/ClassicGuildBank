using ClassicGuildBankData.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Data
{
    public class ClassicGuildBankSeeder
    {
        #region Data Members

        private readonly ClassicGuildBankDbContext _dbContext;

        private readonly UserManager<ClassicGuildBankUser> _userManager;

        #endregion

        #region Constructor

        public ClassicGuildBankSeeder
        (
            ClassicGuildBankDbContext classicGuildBankDbContext,
            UserManager<ClassicGuildBankUser> userManager
        )
        {
            _dbContext = classicGuildBankDbContext;
            _userManager = userManager;
        }

        #endregion

        #region Public Methods

        public async Task Seed()
        {
            _dbContext.Database.EnsureCreated();


            await SeedUsers(); 
            await SeedData();
        }

        #endregion

        #region Private Methods

        private async Task SeedUsers()
        {
            var user = await _userManager.FindByNameAsync("Skorppio");
            if (user == null)
            {
                user = new ClassicGuildBankUser()
                {
                    UserName = "Skorppio",
                    Email = "athielking@501software.com"
                };

                var result = await _userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
            }

            user = await _userManager.FindByNameAsync("Rumjugs");
            if (user == null)
            {
                user = new ClassicGuildBankUser()
                {
                    UserName = "Rumjugs",
                    Email = "culhamda@gmail.com"
                };

                var result = await _userManager.CreateAsync(user, "P@ssw0rd!");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
            }
        }

        private async Task SeedData()
        {
            if (!_dbContext.Guilds.Any(g => g.Id == new Guid(fg1Id)))
            {
                var fakeGuild = GetFakeGuild1();
                _dbContext.Guilds.Add(fakeGuild);
                await _dbContext.SaveChangesAsync();
            }

        }

        private static string fg1Id = "72D8FD17-9D7B-47E3-882E-E81CD8FB91D0";
        public Guild GetFakeGuild1()
        {
            return new Guild
            {
                Id = new Guid(fg1Id),
                Name = "Loch Modan Yacht Club",
                UserId = "1fd88486-4c11-4980-98f0-5f0821424ed3", //Skorppio
                Characters = new List<Character>
                {
                    GetFakeCharacter1()
                },
                GuildMembers = new List<GuildMember>
                {
                    new GuildMember {
                        
                        _GuildId = fg1Id,
                        DisplayName = "skorppio",
                        UserId = "1fd88486-4c11-4980-98f0-5f0821424ed3",
                    }
                }
            };
        }

        private static string fc1Id = "1A6C7066-F013-4378-AA56-24C53F963288";
        public Character GetFakeCharacter1()
        {
            var bank = new Bag
            {
                _CharacterId = fc1Id,
                _Id = "F5091DD3-A11F-4864-A6DF-2A78594A90A9",
                isBank = true,
                BagSlots = new List<BagSlot>()
            };

            var bb1 = new Bag()
            {
                _CharacterId = fc1Id,
                _Id = "D69A53A8-BA4D-4FEA-94CE-61CE613D00F6",
                isBank = true,
                BagSlots = new List<BagSlot>(),
                BagItem = _dbContext.Items.FirstOrDefault(i => i.Id == 17966)
            };

            var backpack = new Bag
            {
                _CharacterId = fc1Id,
                _Id = "484D54A0-77DF-4446-AC56-430CC049042F",
                BagSlots = new List<BagSlot>()
            };

            for (int i = 0; i < 28; i++)
                bank.BagSlots.Add(new BagSlot { BagId = bank.Id, SlotId = i });

            for (int i = 0; i < 18; i++)
                bb1.BagSlots.Add(new BagSlot { BagId = bb1.Id, SlotId = i });

            for (int i = 0; i < 16; i++)
                backpack.BagSlots.Add(new BagSlot { BagId = backpack.Id, SlotId = i });


            bank.BagSlots[0].ItemId = 14047;
            bank.BagSlots[0].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 14047);
            bank.BagSlots[1].ItemId = 13445;
            bank.BagSlots[1].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 13445);
            bank.BagSlots[4].ItemId = 7078;
            bank.BagSlots[4].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 7078);

            backpack.BagSlots[0].ItemId = 19019;
            backpack.BagSlots[0].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 19019);
            backpack.BagSlots[1].ItemId = 17182;
            backpack.BagSlots[1].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 17182);

            bb1.BagSlots[0].Item = _dbContext.Items.FirstOrDefault(i => i.Id == 13457);
            bb1.BagSlots[0].ItemId = 13457;

            return new Character
            {
                _Id = fc1Id,
                Name = "Skorppio",
                _GuildId = fg1Id,
                Bags = new List<Bag>
                {
                    backpack,
                    bank,
                    bb1
                }
            };
        }
        #endregion
    }
}
