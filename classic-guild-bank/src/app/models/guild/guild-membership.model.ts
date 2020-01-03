export class GuildMembership {
    public userId: string;
    public guildId: string;
    public displayName: string;
    public guildName: string;
    public isOwner: boolean;
    
    constructor(init?: Partial<GuildMembership>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}