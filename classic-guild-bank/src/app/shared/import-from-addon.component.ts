import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { GuildStore } from './guild.store';

@Component({
  selector: 'cgb-import-from-addon',
  templateUrl: './import-from-addon.component.html',
  styleUrls: ['./import-from-addon.component.css']
})
export class ImportFromAddonComponent implements OnInit {
  @Output() closeRequested: EventEmitter<any> = new EventEmitter();
  @Output() onImportStringUploaded: EventEmitter<any> = new EventEmitter();

  public addonImportForm: FormGroup;

  public errorText: string;

  public formSubmitted: boolean = false;

  public uploadingImportString: boolean = false;

  @ViewChild(ClrForm, { static: false }) clrForm: ClrForm;

  constructor(
    private formBuilder: FormBuilder,
    private guildStore: GuildStore
  ) { }

  ngOnInit() {
    this.addonImportForm = this.formBuilder.group({
      importText: new FormControl('', [Validators.required]),
    });
  }

  public closeImportAddonModal() {
    this.closeRequested.emit(null);
  }

  public onSubmit() {
    this.errorText = undefined;

    if (!this.addonImportForm.valid) {
      this.clrForm.markAsDirty();
      return;
    }

    this.uploadingImportString = true;

    this.guildStore.uploadImportString(this.addonImportForm.value.importText).subscribe({
      next: () => {
        this.closeImportAddonModal();
        this.uploadingImportString = false;
        this.onImportStringUploaded.emit(null);
      },
      error: (errorResponse) => {
        console.error(errorResponse.error);
        this.errorText = errorResponse.error.errorMessage;
        this.uploadingImportString = false;
      }
    });
  }
}