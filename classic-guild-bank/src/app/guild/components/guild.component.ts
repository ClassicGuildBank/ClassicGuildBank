import { Component } from '@angular/core';
import { Guild } from '../../models/guildbank/guild';
import { GuildStore } from 'src/app/shared/guild.store';
import { Observable } from 'rxjs';

@Component({
    selector: 'cgb-guild',
    templateUrl: './guild.component.html',
})
export class GuildComponent {

    public charactersLoading$: Observable<boolean>;

    public guild$: Observable<Guild>;

    public guildsLoading$: Observable<boolean>;

    public showAddGuildModal = false;
    
    constructor(
        private guildStore: GuildStore      
    ) {      
        this.guild$ = this.guildStore.guild$;  
        this.guildsLoading$ = this.guildStore.guildsLoading$;
        this.charactersLoading$ = this.guildStore.charactersLoading$;
    }

    public addNewGuild() {
        this.showAddGuildModal = true;
    }

    public onAddGuildModalClosed() {       
        this.showAddGuildModal = false;
    }
}

  