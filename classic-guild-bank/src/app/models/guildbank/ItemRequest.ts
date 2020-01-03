import { ItemRequestDetail } from "./itemRequestDetail";

export class ItemRequest {
    public id: string;
    public characterName: string;
    public gold: number = 0;
    public status: string;
    public reason: string;
    public dateRequested: Date;   
    public itemRequestDetails: ItemRequestDetail[];
    
    public get goldAmt() { return Math.floor(this.gold / 10000) }
    public get silverAmt() { return Math.floor((this.gold / 100) % 100); }
    public get copperAmt() { return this.gold % 100; }

    constructor(init?: Partial<ItemRequest>){
        if (init) {
            Object.assign(this, init);

            if( init.dateRequested )
                this.dateRequested = new Date(init["dateRequested"])
        }
    }
}