export class AddGuildModel {
    public guildName: string;

    constructor(init?: Partial<AddGuildModel>){
        if (init) {
            Object.assign(this, init);
        }
    }
}