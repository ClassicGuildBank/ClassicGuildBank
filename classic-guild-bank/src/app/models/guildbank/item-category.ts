import { Item } from "./item";

export class ItemCategory {
    public value: number;
    public name: string;
    public subCategories?: ItemSubCategory[];

    constructor( value: number, name: string, sub?: ItemSubCategory[] ) {
        this.value = value;
        this.name = name;
        this.subCategories = sub;
    }
}

export class ItemSubCategory {
    public value: number;
    public name: string;

    constructor(value: number, name: string) {
        this.value = value;
        this.name = name;
    }
}

export function getCategorization(item: Item) : string[] {
 
    const category = ItemCategories.find( c => c.value === item.class);
    let sub = undefined;
    if( category.subCategories )
        sub = category.subCategories.find( s => s.value === item.subclass);

    return [category.name, sub ? sub.name : ''];
}

export const ItemCategories: ItemCategory[] = [
    new ItemCategory(0, "Consumable", [
        new ItemSubCategory(0, 'Consumable'),
        new ItemSubCategory(1, 'Potion'),
        new ItemSubCategory(2, 'Elixir'),
        new ItemSubCategory(3, 'Flask'),
        new ItemSubCategory(4, 'Scroll'),
        new ItemSubCategory(5, 'Food'),
        new ItemSubCategory(6, 'Item Enhancement'),
        new ItemSubCategory(7, 'Bandage'),
        new ItemSubCategory(8, 'Other'),
    ]),
    new ItemCategory(1, "Container", [
        new ItemSubCategory(0, 'Container'),
        new ItemSubCategory(1, 'Soul'),
        new ItemSubCategory(2, 'Herb'),
        new ItemSubCategory(3, 'Enchanting'),
        new ItemSubCategory(4, 'Engineering'),
        new ItemSubCategory(5, 'Gem'),
        new ItemSubCategory(6, 'Mining'),
        new ItemSubCategory(7, 'Leatherworking'),
    ]),
    new ItemCategory(2, "Weapon", [
        new ItemSubCategory(0, 'Axe'),
        new ItemSubCategory(1, '2h Axe'),
        new ItemSubCategory(2, 'Bow'),
        new ItemSubCategory(3, 'Gun'),
        new ItemSubCategory(4, 'Mace'),
        new ItemSubCategory(5, '2h Mace'),
        new ItemSubCategory(6, 'Polearm'),
        new ItemSubCategory(7, 'Sword'),
        new ItemSubCategory(8, '2h Sword'),
        new ItemSubCategory(9, undefined),
        new ItemSubCategory(10, 'Staff'),
        new ItemSubCategory(11, 'Exotic'),
        new ItemSubCategory(12, '2h Exotic'),
        new ItemSubCategory(13, 'Fist'),
        new ItemSubCategory(14, 'Misc'),
        new ItemSubCategory(15, 'Dagger'),
        new ItemSubCategory(16, 'Thrown'),
        new ItemSubCategory(17, 'Spear'),
        new ItemSubCategory(18, 'Crossbow'),
        new ItemSubCategory(19, 'Wand'),
        new ItemSubCategory(20, 'Fishing Pole'),
    ]),
    // new ItemCategory(3, 'Gem', [

    // ]),
    new ItemCategory(4, 'Armor', [
        new ItemSubCategory(0, 'Misc'),
        new ItemSubCategory(1, 'Cloth'),
        new ItemSubCategory(2, 'Leather'),
        new ItemSubCategory(3, 'Mail'),
        new ItemSubCategory(4, 'Plate'),
        new ItemSubCategory(5, 'Buckler'),
        new ItemSubCategory(6, 'Shield'),
        new ItemSubCategory(7, 'Libram'),
        new ItemSubCategory(8, 'Idol'),
        new ItemSubCategory(9, 'Totem'),
    ]),
    new ItemCategory(5, 'Reagent'),
    new ItemCategory(6, 'Projectile', [
        new ItemSubCategory(0, 'Wand'),
        new ItemSubCategory(1, 'Bolt'),
        new ItemSubCategory(2, 'Arrow'),
        new ItemSubCategory(3, 'Bullet'),
        new ItemSubCategory(4, 'Thrown'),
    ]),
    new ItemCategory(7, 'Trade Goods',[
        new ItemSubCategory(0, 'Trade Goods'),
        new ItemSubCategory(1, 'Parts'),
        new ItemSubCategory(2, 'Explosives'),
        new ItemSubCategory(3, 'Devices'),
        //new ItemSubCategory(4, 'Jewelcrafting'),
        new ItemSubCategory(5, 'Cloth'),
        new ItemSubCategory(6, 'Leather'),
        new ItemSubCategory(7, 'Metal/Stone'),
        new ItemSubCategory(8, 'Meat'),
        new ItemSubCategory(9, 'Herb'),
        new ItemSubCategory(10, 'Elemental'),
        new ItemSubCategory(11, 'Other'),
        new ItemSubCategory(12, 'Enchanting'),
    ]),
    new ItemCategory(8, 'Generic'),
    new ItemCategory(9, 'Recipe', [
        new ItemSubCategory(0, 'Book'),
        new ItemSubCategory(1, 'Leatherworking'),
        new ItemSubCategory(2, 'Tailoring'),
        new ItemSubCategory(3, 'Engineering'),
        new ItemSubCategory(4, 'Blacksmithing'),
        new ItemSubCategory(5, 'Cooking'),
        new ItemSubCategory(6, 'Alchemy'),
        new ItemSubCategory(7, 'First Aid'),
        new ItemSubCategory(8, 'Enchanting'),
        new ItemSubCategory(9, 'Fishing'),
    ]),
    new ItemCategory(10, 'Money'),
    new ItemCategory(11, 'Quiver', [
        new ItemSubCategory(0, 'Quiver'),
        new ItemSubCategory(1, 'Quiver'),
        new ItemSubCategory(2, 'Quiver'),
        new ItemSubCategory(3, 'Ammo Pouch'),
    ]),
    new ItemCategory(12, 'Quest'),
    new ItemCategory(13, 'Key', [
        new ItemSubCategory(0, 'Key'),
        new ItemSubCategory(1, 'Lockpick'),
    ]),
    new ItemCategory(14, 'Permanent'),
    new ItemCategory(15, 'Misc', [
        new ItemSubCategory(0, 'Misc'),
        new ItemSubCategory(1, 'Reagent'),
        new ItemSubCategory(2, 'Pet'),
        new ItemSubCategory(3, 'Holiday'),
        new ItemSubCategory(4, 'Other'),
        new ItemSubCategory(5, 'Mount'),
    ])
]