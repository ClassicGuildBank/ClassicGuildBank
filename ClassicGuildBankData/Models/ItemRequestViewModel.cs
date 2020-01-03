using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class ItemRequestViewModel
    {
        #region Properties
        
        public Guid Id
        {
            get;
            set;
        }

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

        public string Status
        {
            get;
            set;
        }

        public string Reason
        {
            get;
            set;
        }

        public DateTime? DateRequested
        {
            get;
            set;
        }

        public List<ItemRequestDetailViewModel> ItemRequestDetails
        {
            get;
            set;
        }

        #endregion
    }
}
