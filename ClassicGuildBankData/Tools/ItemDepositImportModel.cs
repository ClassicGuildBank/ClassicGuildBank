using System;
using System.Collections.Generic;
using System.Text;

namespace ClassicGuildBankData.Tools
{
    public class ItemDepositImportModel
    {
        private readonly string _characterName;
        public string CharacterName { get => _characterName; }

        private readonly int _itemId;
        public int ItemId { get => _itemId;  }

        private readonly int _itemCount;
        public int ItemCount { get => _itemCount;  }

        private readonly int _money;
        public int Money { get => _money; }

        private readonly DateTime _dateDeposited;
        public DateTime DateDeposited { get => _dateDeposited; }

        public ItemDepositImportModel
        (
            string characterName,
            int itemId,
            int itemCount,
            int money
        )
        {
            _characterName = characterName;
            _itemId = itemId;
            _itemCount = itemCount;
            _money = money;

            _dateDeposited = DateTime.UtcNow;
        }
    }
}
