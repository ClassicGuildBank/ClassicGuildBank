using ClassicGuildBankData.Models;
using ClassicGuildBankData.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Tools
{
    public class CharacterImporter
    {
        #region Data Members

        private readonly CharacterImportModel _characterImportModel;

        private readonly ClassicGuildBankUser _classicGuildBankUser;

        private readonly GuildBankRepository _guildBankRepository;

        private readonly Guid _guildId;

        #endregion

        #region Constructor

        private CharacterImporter
        (
            GuildBankRepository guildBankRepository,
            ClassicGuildBankUser classicGuildBankUser,
            Guid guildId,
            CharacterImportModel characterImportModel
        )
        {
            _guildBankRepository = guildBankRepository;
            _classicGuildBankUser = classicGuildBankUser;
            _guildId = guildId;
            _characterImportModel = characterImportModel;
        }

        #endregion

        #region Public Methods

        public static void ImportCharacter
        (
            GuildBankRepository guildBankRepository, 
            ClassicGuildBankUser classicGuildBankUser,
            Guid guildId, 
            string encodedImportString 
        )
        {
            var characterImportModel = new CharacterImportModel(encodedImportString);

            new CharacterImporter
            (
                guildBankRepository,
                classicGuildBankUser,
                guildId, 
                characterImportModel
            ).ImportCharacter();
        }

        #endregion

        #region Private Methods
        
        private Character CreateCharacter()
        {
            return new Character()
            {
                Id = Guid.NewGuid(),
                GuildId = _guildId,
                Name = _characterImportModel.CharacterName,
                Gold = _characterImportModel.Money,
                LastUpdated = DateTime.Now
            };
        }

        private void ImportCharacter()
        {
            //Add Character
            var character = CreateCharacter();

            //Add Bags
            AddBags(character);

            //Save
            _guildBankRepository.UpdateGuildCharacter(character, _guildId, _classicGuildBankUser);
            _guildBankRepository.AddGuildTransactions(_guildId, _classicGuildBankUser, _characterImportModel.DepositImportModels);
        }

        private void AddBags(Character character)
        {
            for (int i = 0; i < _characterImportModel.BagImportModels.Count; i++)
            {
                var bagImportModel = _characterImportModel.BagImportModels[i];

                if (i > 1 && bagImportModel.BagName == string.Empty)
                    continue;

                var itemId = i > 1 ? GetItemId(bagImportModel.BagName, _characterImportModel.Localization) : null;

                var bag = new Bag()
                {
                    Id = Guid.NewGuid(),
                    isBank = i == 0 || i > 5,
                    CharacterId = character.Id,
                    ItemId = itemId
                    //ContainerId
                };

                foreach( var bagItemImportModel in bagImportModel.BagItemImportModels )
                {
                    var bagSlot = new BagSlot()
                    {
                        BagId = bag.Id,
                        ItemId = bagItemImportModel.ItemId,
                        SlotId = bagItemImportModel.BagSlot,
                        Quantity = bagItemImportModel.Quantity
                    };

                    bag.BagSlots.Add(bagSlot);
                }

                character.Bags.Add(bag);
            }
        }

        private int? GetItemId(string bagName, string localization)
        {
            if (bagName == string.Empty)
                return null;

            var item = _guildBankRepository.GetItemByName(bagName, localization);

            if (item == null)
                return null;

            return item.Id;
        }

        #endregion
    }
}
