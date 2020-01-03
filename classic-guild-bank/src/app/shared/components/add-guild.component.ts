import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ClrForm } from '@clr/angular';
import { GuildStore } from '../guild.store';
import { ModalService } from 'src/app/core/modal.service';
import { AddGuildModel } from 'src/app/models/guild/addGuildModel';
import { ErrorComponent } from 'src/app/shared/components/error.component';

@Component({
  selector: 'cgb-add-guild',
  templateUrl: './add-guild.component.html'
})
export class AddGuildComponent {
  @Output() closeRequested: EventEmitter<any> = new EventEmitter();
  
  public guildName = '';

  @ViewChild(ClrForm, {static: false} ) clrForm : ClrForm;

  constructor(     
    private guildStore: GuildStore,
    private modalService: ModalService
  ) {     
  }

  public closeAddGuildModal() {       
    this.closeRequested.emit(null);
  }

  public submitAddGuildForm() {
    var addGuildModel = new AddGuildModel({
        guildName: this.guildName
    });

    this.guildStore.addGuild(addGuildModel).subscribe({
        next: () => this.closeAddGuildModal(),
        error: () => this.modalService.openModal(ErrorComponent, {message: "Unable to Create Guild"})
    });
  }
}