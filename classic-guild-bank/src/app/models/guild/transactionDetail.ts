import { Item } from "../guildbank/item";

export class TransactionDetail {
    public quantity: number;
    public item: Item;
    
    constructor(init?: Partial<TransactionDetail>){
        if (init) {
            Object.assign(this, init);
        }
    }
}