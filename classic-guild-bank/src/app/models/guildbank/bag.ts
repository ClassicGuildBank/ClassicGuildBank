import { BagSlot } from "./bagslot";
import { Item } from "./item";

export class Bag {
    public id: number;
    public characterId: number;
    public isBank: boolean;
    public bagContainerId: number;
    public bagItem?: Item;
    public bagSlots: BagSlot[];

    constructor(init?: Partial<Bag>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}