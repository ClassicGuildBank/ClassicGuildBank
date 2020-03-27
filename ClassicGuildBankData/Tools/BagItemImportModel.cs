using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Tools
{
    public class BagItemImportModel
    {
        #region Properties

        private readonly int _bagslot;
        public int BagSlot
        {
            get
            {
                return _bagslot;
            }
        }

        private readonly int _itemId;
        public int ItemId
        {
            get
            {
                return _itemId;
            }
        }

        private readonly int _quantity;
        public int Quantity
        {
            get
            {
                return _quantity;
            }
        }

        #endregion

        #region Constructor

        public BagItemImportModel
        (
            int bagSlot,
            int itemId,
            int quantity
        )
        {
            _bagslot = bagSlot;
            _itemId = itemId;
            _quantity = quantity;
        }

        #endregion
    }
}
