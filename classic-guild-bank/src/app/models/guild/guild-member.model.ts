export class GuildMember {
    public userId: string;
    public guildId: string;
    public displayName: string;
    public canUpload: boolean;
    
    constructor(init?: Partial<GuildMember>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}