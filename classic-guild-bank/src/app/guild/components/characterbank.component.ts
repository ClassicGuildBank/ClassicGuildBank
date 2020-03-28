import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../models/guildbank/character';
import { Bag } from 'src/app/models/guildbank/bag';
import { Item } from 'src/app/models/guildbank/item';
import { GuildStore } from '../../shared/guild.store';
import { ModalService } from 'src/app/core/modal.service';
import { ErrorComponent } from 'src/app/shared/components/error.component';

@Component({
    selector: 'characterbank',
    templateUrl: './characterbank.component.html',
    styleUrls: ['./characterbank.component.css']
})
export class CharacterBankComponent implements OnInit {
    @Input() character: Character;
    @Input() isGuildOwner: Boolean;
    @Input() readonly: boolean = false;

    public bankBagItem: Item = new Item({ icon: 'achievement_guildperk_mobilebanking' })
    public backpackItem: Item = new Item({ icon: 'inv_misc_bag_08' })

    public showDeleteCharacterModal = false;

    get bank(): Bag {
        return this.character.bags.find(b => b.isBank && !b.bagItem);
    }

    get bankBags(): Bag[] {
        return this.character.bags.filter(b => b.isBank && b.bagItem).sort((a, b) => (a.bagContainerId > b.bagContainerId) ? 1 : -1);
    }

    get backpack(): Bag {
        return this.character.bags.find(b => !b.isBank && !b.bagItem);
    }

    get characterBags(): Bag[] {
        return this.character.bags.filter(b => !b.isBank && b.bagItem).sort((a, b) => (a.bagContainerId > b.bagContainerId) ? 1 : -1);
    }

    constructor(
        private guildStore: GuildStore,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        console.log(this.bankBags);
        console.log(this.characterBags);
    }

    public deleteCharacter() {
        this.showDeleteCharacterModal = true;
    }

    public cancelDelete() {
        this.showDeleteCharacterModal = false;
    }

    public deleteConfirmed() {
        this.guildStore.deleteCharacterFromGuild(this.character).subscribe({
            next: () => {
                this.showDeleteCharacterModal = false;
            },
            error: () => this.modalService.openModal(ErrorComponent, { message: "Unable to Delete Character" })
        });
    }
}

