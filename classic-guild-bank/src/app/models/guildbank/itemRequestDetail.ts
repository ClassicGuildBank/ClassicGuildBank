import { Item } from "./item";

export class ItemRequestDetail {
    public quantity: number;
    public item: Item;
    
    constructor(init?: Partial<ItemRequestDetail>){
        if (init) {
            Object.assign(this, init);
        }
    }
}