import { Component, OnInit, Input } from '@angular/core';
import { UserStore } from '../user/user.store';
import { Router } from '@angular/router';
import { GuildStore } from './guild.store';
import { Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import { Guild } from '../models/guildbank/guild';

import * as configuration from '../../config/appconfig.json';
import { LANGUAGE_PREFERENCE } from './constants';
import { windowToggle } from 'rxjs/operators';
import { ModalService } from '../core/modal.service';
import { DonateComponent } from './components/donate.component';


@Component({
    selector: 'cgb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() readonly: boolean = false;
    
    public activeUser: string;
    public activeLanguage: string;
    public guilds$: Observable<Guild[]>;
    public activeGuild$: Observable<Guild>;
    public isPatron: Boolean;
    public wowheadUrls = [];

    public selectedGuild = new FormControl('');
    
    public showAddGuildModal = false;

    constructor(
        private userStore: UserStore,
        private guildStore: GuildStore,
        private router: Router,
        private modalService: ModalService
    ) {        
    }

    public ngOnInit() {
        this.activeUser = this.userStore.getLoggedInUser();
        this.guilds$ = this.guildStore.guildList$;
        this.activeGuild$ = this.guildStore.guild$;
        
        this.activeLanguage = localStorage.getItem(LANGUAGE_PREFERENCE);
        if(!this.activeLanguage) {
            this.activeLanguage = "en";
            localStorage.setItem(LANGUAGE_PREFERENCE, "en");
        }

        this.wowheadUrls = Object.keys(configuration.wowhead).map( k => {
            return {language: k, url: configuration.wowhead[k]};
        });
    }

    public logout(): void {
        this.userStore.logout().subscribe({
            next: () => {
                this.router.navigate(['user', 'login']);        
            },
            error: e => {
                console.error(e);
                this.router.navigate(['user', 'login']);
            }
        });
    }

    public onGuildSelected(guild: Guild) {
        this.guildStore.updateSelectedGuild(guild.id);
    }

    public addGuildClick() {
        this.showAddGuildModal = true;
    }

    public onAddGuildModalClosed() {       
        this.showAddGuildModal = false;
    }

    public toggleDonate(show: boolean) {
        if(show) {
            this.modalService.openModal(DonateComponent);
        }
    }

    public getPatreonOAuthLink() {
        // https://www.patreon.com/oauth2/authorize?response_type=code&client_id=hmjgYD08W4nvMauZip0okmlof5C1bQWr1CfMCJ_pnccqtZobwBbDme4jSvyekSRh&redirect_uri=http://localhost:4200/patreon/callback&scope=identity identity.memberships campaigns campaigns.members
        return `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${configuration.patreon.client_id}&redirect_uri=${configuration.patreon.oauth_redirect}&scope=identity identity.memberships campaigns campaigns.members`
    }

    public changeLanguage(language: string) {
        this.activeLanguage = language;
        localStorage.setItem(LANGUAGE_PREFERENCE, language);
        window.location.reload();     
    }
}

  