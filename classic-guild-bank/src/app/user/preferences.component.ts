import { Component, OnInit } from '@angular/core';
import { GuildStore } from '../shared/guild.store';
import { GuildMembership } from '../models/guild/guild-membership.model';
import { Observable } from 'rxjs';
import { ModalService } from '../core/modal.service';
import { ErrorComponent } from '../shared/components/error.component';
import * as config from '../../config/appconfig.json';
import { UserStore } from './user.store';

@Component({
  selector: 'cgb-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  public guildMembership$: Observable<GuildMembership[]>;
  public showChangeDisplayNameModal = false;
  public editingGuildMember: GuildMembership;
  public displayNameForRename: string;
  public showLeaveGuildModal = false;
  public leavingGuildMember: GuildMembership;
  public wowheadUrls = [];
  public isTokenRevealed = false;
  public readonly token: string;

  constructor(
    private guildStore: GuildStore,
    private modalService: ModalService,
    private readonly userStore: UserStore
  ) {
    this.guildMembership$ = this.guildStore.guildMembership$;     
    this.token = userStore.getToken();
  }

  ngOnInit() {
    this.guildStore.getGuildMembership().subscribe();
    this.wowheadUrls = Object.entries(config.wowhead);
  }

  public onChangeDisplayName(guildMember) {
    this.editingGuildMember = guildMember;
    this.displayNameForRename = guildMember.displayName;

    this.showChangeDisplayNameModal = true;
  }

  public cancelChangeDisplayName() {
    this.showChangeDisplayNameModal = false;
  }

  public submitChangeDisplayNameForm() {
    this.editingGuildMember.displayName = this.displayNameForRename;

    this.guildStore.updateGuildMembership(this.editingGuildMember).subscribe({
      next: () => this.showChangeDisplayNameModal = false,
      error: () => this.modalService.openModal(ErrorComponent, {message: "Unable to Change Display Name"})
    });
  }
  
  public onLeaveGuild(guildMember) {
    this.showLeaveGuildModal = true;
    this.leavingGuildMember = guildMember;
  }

  public cancelLeaveGuild() {
      this.showLeaveGuildModal = false;
  }

  public leaveGuildConfirmed() {
    this.guildStore.removeSelfFromGuild(this.leavingGuildMember.guildId).subscribe({
      next: () => this.showLeaveGuildModal = false,
      error: (error) => this.modalService.openModal(ErrorComponent, {message:error.error.errorMessage})
    });
  }
}
