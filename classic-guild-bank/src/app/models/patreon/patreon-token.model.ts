export class PatreonToken {
    public access_token: string;
    public refresh_token: string;
    public expires_in: number;
    public scope: string;
    public token_type: string;

    constructor(init?: Partial<PatreonToken>){
        if (init) {
            Object.assign(this, init);
        }
    }
}