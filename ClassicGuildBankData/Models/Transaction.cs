using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class Transaction
    {
        #region Properties

        public Guid Id { get; set; }

        public Guid GuildId { get; set; }

        public string Type { get; set; }

        public string CharacterName { get; set; }

        public int? Money { get; set; }

        public DateTime TransactionDate { get; set; }

        public Guild Guild { get; set; }

        private List<TransactionDetail> _transactionDetails;
        public List<TransactionDetail> TransactionDetails
        {
            get
            {
                if (_transactionDetails == null)
                    _transactionDetails = new List<TransactionDetail>();

                return _transactionDetails;
            }
            set
            {
                _transactionDetails = value;
            }
        } 
        
        #endregion
    }
}
