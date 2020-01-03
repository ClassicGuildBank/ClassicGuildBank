using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassicGuildBankData.Models
{
    public class RequestItemModel
    {
        #region Properties

        [Required]
        public int ItemId
        {
            get;
            set;
        }
        
        public int Quantity
        {
            get;
            set;
        }

        #endregion
    }
}
