export class RenameGuildModel {
    public guildId: string;
    public guildName: string;

    constructor(init?: Partial<RenameGuildModel>){
        if (init) {
            Object.assign(this, init);
        }
    }
}