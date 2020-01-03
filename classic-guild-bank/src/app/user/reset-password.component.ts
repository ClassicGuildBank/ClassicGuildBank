import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { UserStore } from './user.store';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'cgb-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  @Input() showModal: boolean;
  @Output() closeRequested: EventEmitter<any> = new EventEmitter();
  
  public resetForm: FormGroup;
  public errorText: string;
  public successText: string;
  public formSubmitted: boolean = false;

  @ViewChild(ClrForm, {static: false} ) clrForm : ClrForm;

  constructor(
    private userStore: UserStore,       
    private formBuilder: FormBuilder) {
    }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  public get f() {
    return this.resetForm.controls;
  }

  public close() {
    this.closeRequested.emit(null);
  }

  public submit() {

    this.errorText = undefined;
    this.successText = undefined;

    if (!this.resetForm.valid) {
      this.clrForm.markAsDirty();
      return;
    }

    this.userStore.sendResetPasswordEmail(this.resetForm.value).subscribe({
      next: () => {
        this.successText = "An email has been sent to the address provided. Follow the instructions to reset your password"
        this.formSubmitted = true;
      },
      error: (response) => {
        console.error( response.error );
        debugger;
        this.errorText = response.error.errorMessage;
      }
    });
  }
}
