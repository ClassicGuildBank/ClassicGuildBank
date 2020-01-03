import { RequestItemModel } from "./requestItemModel";

export class RequestItemsModel {
    public characterName: string;
    public gold: number;
    public guildId: string;
    public requestItemModels: RequestItemModel[];

    constructor(init?: Partial<RequestItemsModel>){
        if (init) {
            Object.assign(this, init);
        }
    }
}