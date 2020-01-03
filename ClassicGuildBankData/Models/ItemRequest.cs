using System;
using System.Collections.Generic;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class ItemRequest
    {
        #region Properties

        public Guid Id { get; set; }

        public string CharacterName { get; set; }

        public int Gold { get; set; }

        public string Status { get; set; }

        public string Reason { get; set; }

        public string UserId { get; set; }

        public Guid GuildId { get; set; }

        public Guild Guild { get; set; }

        private List<ItemRequestDetail> _details;
        public List<ItemRequestDetail> Details
        {
            get
            {
                if (_details == null)
                    _details = new List<ItemRequestDetail>();

                return _details;
            }
            set
            {
                _details = value;
            }
        }

        public DateTime? DateRequested { get; set; } 

        #endregion
    }
}
