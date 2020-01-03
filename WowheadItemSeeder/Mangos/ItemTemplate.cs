using System;
using System.Collections.Generic;
using System.Text;

namespace WowheadItemSeeder.Mangos
{
    public class ItemTemplate
    {
        public int entry { get; set; }
        public short _class { get; set; }
        public short subclass { get; set; }
        public string name { get; set; }
        public int displayid { get; set; }
        public short ContainerSlots { get; set; }

    }
}
