import { IWowhead } from "./wowhead.interface";

export class Item implements IWowhead {
    public id: number;
    public name: string;
    public quantity: number;
    public icon: string;
    public url: string;
    public class: number;
    public subclass: number;
    
    public constructor(init?:Partial<Item>) {
        Object.assign(this, init);
    }
}