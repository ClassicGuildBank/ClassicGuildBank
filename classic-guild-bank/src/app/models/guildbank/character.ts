import { Bag } from "./bag";
import { IMoney } from "./money.interface";

export class Character implements IMoney {
    public id: string;
    public name: string;
    public lastUpdated: Date;   
    public gold: number = 0;
    public bags: Bag[]

    public get goldAmt() { return Math.floor(this.gold / 10000) }
    public get silverAmt() { return Math.floor((this.gold / 100) % 100); }
    public get copperAmt() { return this.gold % 100; }

    constructor(init?: Partial<Character>){
        if (init) {
            Object.assign(this, init);
            if( init.lastUpdated )
                this.lastUpdated = new Date(init["lastUpdated"])
        }
    }
}