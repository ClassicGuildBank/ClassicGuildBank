export class RequestItemModel {
    public itemId: number;
    public quantity: number;

    constructor(init?: Partial<RequestItemModel>){
        if (init) {
            Object.assign(this, init);
        }
    }
}