using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClassicGuildBankData.Models
{
    public class BagSlot
    {
        public int SlotId { get; set; }
        public int Quantity { get; set; }
        [JsonIgnore]
        public Guid BagId { get; set; }

        [NotMapped]
        [JsonProperty("bagId")]
        public string _BagId { get => BagId.ToString(); set => BagId = new Guid(value); }

        [JsonIgnore]
        public int? ItemId { get; set; }

        [JsonIgnore]
        public Bag Bag { get; set; }

        public Item Item { get; set; }
    };
}
