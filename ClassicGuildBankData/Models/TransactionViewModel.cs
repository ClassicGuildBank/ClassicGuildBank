using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class TransactionViewModel
    {
        #region Properties

        public string CharacterName
        {
            get;
            set;
        }

        public int Gold
        {
            get;
            set;
        }

        public DateTime? TransactionDate
        {
            get;
            set;
        }        
        
        public List<TransactionDetailViewModel> TransactionDetails
        {
            get;
            set;
        }

        public string TransactionType
        {
            get;
            set;
        }

        #endregion
    }
}
