import { Item } from "./item";
import { getCategorization } from "./item-category";
import { IItemParent } from "./item-parent.interface";

export class ListItem implements IItemParent {
    public item: Item;
    public category: string;
    public subcategory: string;
    public quantity: number = 0;

    public contributions: { [name: string]: number } = {};

    constructor(item: Item, quantity?: number) {
        const cat = getCategorization(item);

        this.item = item;
        this.category = cat[0];
        this.subcategory = cat[1];
        
        if(quantity)
            this.quantity = quantity;
    }
}