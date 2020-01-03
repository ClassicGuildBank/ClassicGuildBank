import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Guild } from 'src/app/models/guildbank/guild';
import { GuildStore } from '../../shared/guild.store';
import { ModalService } from 'src/app/core/modal.service';
import { ErrorComponent } from 'src/app/shared/components/error.component';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as configuration from '../../../config/appconfig.json';

@Component({
    selector: 'manageguild',
    templateUrl: './manageguild.component.html'
})
export class ManageGuildComponent implements OnInit {
    public guild$: Observable<Guild>;
    public guildMembers$: Observable<any[]>;

    public showInvitePeopleModal = false;
    public showRenameGuildModal = false;
    public showDeleteGuildModal = false;
    public showPublicSettingsModal = false;

    public inviteUrl: string;
    public publicUrl: string;
    public publicLinkEnabled: boolean;

    public guildNameForRename: string;
    public isLoading = false;
    public copyText = 'Copy';
    
    constructor(
        private guildStore: GuildStore,
        private modalService: ModalService,
        private router: Router
    ) {      
        this.guild$ = this.guildStore.guild$;  
        this.guildMembers$ = this.guildStore.guildMembers$;
    }

    public ngOnInit() {        
        this.guild$.pipe(
            tap({
                next: guild => {
                    this.guildNameForRename = guild ? guild.name : null;
                    this.inviteUrl =  guild ? `${configuration.client}/#/user/invite/${guild.inviteUrl}` : null;
                    this.publicUrl = guild ? `${configuration.client}/#/guild/readonly/${guild.publicUrl}` : null;
                    this.publicLinkEnabled = guild ? guild.publicLinkEnabled : false;

                    if(guild != null)
                        this.guildStore.getGuildMembers(guild.id).subscribe();
                }
            }))
            .subscribe();
    }

    public renameGuild() {
        this.showRenameGuildModal = true;
    }

    public cancelRename() {       
        this.showRenameGuildModal = false;
    }

    public submitRenameGuildForm() {
        this.guildStore.renameCurrentGuild(this.guildNameForRename).subscribe({
            next: () => this.showRenameGuildModal = false,
            error: () => this.modalService.openModal(ErrorComponent, {message: "Unable to Rename Guild"})
        });
    }

    public deleteGuild() {
        this.showDeleteGuildModal = true;
    }

    public cancelDelete() {
        this.showDeleteGuildModal = false;
    }

    public invitePeople() {
        this.showInvitePeopleModal = true;
    }

    public showPublicSettings() {
        this.showPublicSettingsModal=true
    }

    public enablePublicLink() {
        this.isLoading = true;
        this.guildStore.updateGuildPublicLink(true).subscribe({
            next: () => this.isLoading = false
        })
    }

    public disablePublicLink() {
        this.isLoading = true;
        this.guildStore.updateGuildPublicLink(false).subscribe({
            next: () => this.isLoading = false
        })
    }

    public deleteConfirmed() {
        this.guildStore.deleteCurrentGuild().subscribe({
            next: () => {
                this.showDeleteGuildModal = false;
                this.router.navigate(['/guild']);
            },
            error: () => this.modalService.openModal(ErrorComponent, {message:"Unable to Delete Guild"})
        });
    }

    public resetLink() {
        this.isLoading = true;
        this.guildStore.updateGuildInviteLink().subscribe({
            next: () => this.isLoading = false
        })
    }

    public resetPublicLink() {
        this.isLoading = true;
        this.guildStore.updateGuildPublicLink(this.publicLinkEnabled).subscribe({
            next: () => this.isLoading = false
        })
    }

    public notifyCopied(e: string) {
        console.log(e);
        this.copyText = 'Copied';
    }

    public onDeleteGuildMember(guildMember) {
        this.guildStore.removeMemberFromGuild(guildMember.userId).subscribe({
            error: (error) => this.modalService.openModal(ErrorComponent, {message:error.error.errorMessage})
        });
    }

    public onToggleUploadAccess(guildMember) {
        this.guildStore.toggleUploadAccess(guildMember.userId).subscribe({
            error: (error) => this.modalService.openModal(ErrorComponent, {message:error.error.errorMessage})
        });
    }
}

  