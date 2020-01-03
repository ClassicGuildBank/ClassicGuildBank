import { Item } from "./item";
import { FormControl, Validators } from "@angular/forms";
import { IItemParent } from "./item-parent.interface";
import { getCategorization } from "./item-category";

export class CartItem implements IItemParent {
    public available: number = 0;
    public quantity: FormControl;
    public category: string;
    public subcategory: string;
    
    constructor(public item: Item) {
        const cat = getCategorization(item);
        
        this.quantity = new FormControl(0);   
        this.category = cat[0];     
        this.subcategory = cat[1];
    }

    public setAvailableAmount(available: number) {
        this.available = available;
        this.quantity.setValidators([Validators.min(0), Validators.max(this.available)]);
    }

}