import { Character } from "./character";

export class Guild {
    public id: string;
    public name: string;
    public characters: Character[];
    public userIsOwner: boolean;
    public isSelected: boolean;
    public inviteUrl: string;
    public publicUrl: string;
    public publicLinkEnabled: boolean;
    public userCanUpload: boolean;

    constructor(init?: Partial<Guild>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}