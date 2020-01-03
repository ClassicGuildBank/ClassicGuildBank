import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { UserStore } from './user.store';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { passwordStrength } from '../shared/shared.validators';

@Component({
  selector: 'cgb-register-user',
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
  @Input() showModal: boolean;
  @Output() closeRequested: EventEmitter<any> = new EventEmitter();
  
  public registerForm: FormGroup;

  public errorText: string;
  public successText: string;

  public formSubmitted: boolean = false;

  @ViewChild(ClrForm, {static: false} ) clrForm : ClrForm;


  constructor(
    private userStore: UserStore,       
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {     
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrength()]),
      repeatPassword: new FormControl('', [Validators.required]),
      guildToken: new FormControl('')
    }, {
      validator: this.mustMatch('password', 'repeatPassword')
    }),

    this.activatedRoute.paramMap.pipe(take(1)).subscribe(map => {
      const token = map.get('guildToken');
      if( token ) {
        this.registerForm.get('guildToken').setValue(token);
      }
    });
  }

  // convenience getter for easy access to form field in html
  public get f() {
    return this.registerForm.controls;
  }

  public closeRegister() { 
    this.registerForm.reset();      
    this.closeRequested.emit(null);
  }

  public onSubmit() {
    this.errorText = undefined;
    this.successText = undefined;

    if (!this.registerForm.valid) {
      this.clrForm.markAsDirty();
      return;
    }

    this.userStore.registerUser(this.registerForm.value).subscribe({
      next: () =>{
        this.successText = "An email has been sent to the address provided, you must confirm your account before logging in."
        this.formSubmitted = true;
      }, 
      error: (errorResponse) => {
        console.error( errorResponse.error );
        this.errorText = errorResponse.error.errorMessage;
      }
    });
  }

  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  private onError(errorResponse) {
    
    this.errorText = errorResponse.error;
  }
}