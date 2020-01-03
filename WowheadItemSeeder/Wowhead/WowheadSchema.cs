using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace WowheadItemSeeder.WowheadSchema
{
    [XmlRoot(ElementName = "quality")]
    public class Quality
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "class")]
    public class Class
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "subclass")]
    public class Subclass
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "icon")]
    public class Icon
    {
        [XmlAttribute(AttributeName = "displayId")]
        public string DisplayId { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "inventorySlot")]
    public class InventorySlot
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlText]
        public string Text { get; set; }
    }

    [XmlRoot(ElementName = "reagent")]
    public class Reagent
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "quality")]
        public string Quality { get; set; }
        [XmlAttribute(AttributeName = "icon")]
        public string Icon { get; set; }
        [XmlAttribute(AttributeName = "count")]
        public string Count { get; set; }
    }

    [XmlRoot(ElementName = "spell")]
    public class Spell
    {
        [XmlElement(ElementName = "reagent")]
        public List<Reagent> Reagent { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "icon")]
        public string Icon { get; set; }
        [XmlAttribute(AttributeName = "minCount")]
        public string MinCount { get; set; }
        [XmlAttribute(AttributeName = "maxCount")]
        public string MaxCount { get; set; }
    }

    [XmlRoot(ElementName = "createdBy")]
    public class CreatedBy
    {
        [XmlElement(ElementName = "spell")]
        public Spell Spell { get; set; }
    }

    [XmlRoot(ElementName = "item")]
    public class Item
    {
        [XmlElement(ElementName = "name")]
        public string Name { get; set; }
        [XmlElement(ElementName = "level")]
        public string Level { get; set; }
        [XmlElement(ElementName = "quality")]
        public Quality Quality { get; set; }
        [XmlElement(ElementName = "class")]
        public Class Class { get; set; }
        [XmlElement(ElementName = "subclass")]
        public Subclass Subclass { get; set; }
        [XmlElement(ElementName = "icon")]
        public Icon Icon { get; set; }
        [XmlElement(ElementName = "inventorySlot")]
        public InventorySlot InventorySlot { get; set; }
        [XmlElement(ElementName = "htmlTooltip")]
        public string HtmlTooltip { get; set; }
        [XmlElement(ElementName = "json")]
        public string Json { get; set; }
        [XmlElement(ElementName = "jsonEquip")]
        public string JsonEquip { get; set; }
        [XmlElement(ElementName = "createdBy")]
        public CreatedBy CreatedBy { get; set; }
        [XmlElement(ElementName = "link")]
        public string Link { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "wowhead")]
    public class Wowhead
    {
        [XmlElement(ElementName = "item")]
        public Item Item { get; set; }
    }

}
