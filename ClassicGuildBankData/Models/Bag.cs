using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class Bag
    {
        [JsonIgnore]
        public Guid Id { get; set; }

        [NotMapped]
        [JsonProperty("id")]
        public string _Id { get => Id.ToString(); set => Id = new Guid(value); }

        [JsonIgnore]
        public int? ItemId { get; set; }

        [JsonIgnore]
        public Guid CharacterId { get; set; }

        [NotMapped]
        [JsonProperty("characterId")]
        public string _CharacterId { get => CharacterId.ToString(); set => CharacterId = new Guid(value); }

        public bool isBank { get; set; }

        public int BagContainerId { get; set; }

        private List<BagSlot> _bagSlots;
        public List<BagSlot> BagSlots
        {
            get
            {
                if (_bagSlots == null)
                    _bagSlots = new List<BagSlot>();

                return _bagSlots;
            }
            set
            {
                _bagSlots = value;
            }
        }

        public Item BagItem { get; set; }

        [JsonIgnore]
        public Character Character { get; set; }

        #region Constructor

        public override string ToString()
        {
            return "Id: " + Id + "; ItemId: " + ItemId + "; BagContainerId: " + BagContainerId + "; isBank: " + isBank;
        }

        #endregion

    }
}
