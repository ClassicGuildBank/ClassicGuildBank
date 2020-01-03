import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { mustMatch, passwordStrength } from '../shared/shared.validators';
import { UserStore } from './user.store';

@Component({
  selector: 'app-password-callback',
  templateUrl: './password-callback.component.html',
  styles: []
})
export class PasswordCallbackComponent implements OnInit {  

  public resetForm = this.formBuilder.group({
    code: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, passwordStrength()]),
    confirm: new FormControl(''),
    username: new FormControl('', Validators.required)
  })

  public get code() { return this.resetForm.get('code'); }
  public get password() { return this.resetForm.get('password'); }
  public get confirm() { return this.resetForm.get('confirm'); }
  public get username() {return this.resetForm.get('username'); }

  public successMessage: string;
  public errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userStore: UserStore,
              private router: Router) {

    this.activatedRoute.queryParamMap.pipe(take(1))
      .subscribe(map => {
        this.code.setValue(map.get('code'));
        this.username.setValue(map.get('username'));
      });
  }

  ngOnInit() {
    this.confirm.setValidators([Validators.required, mustMatch(this.password)])
  }

  onSubmit() {

    this.userStore.resetPassword(this.resetForm.value).subscribe({
        next: () => {
          this.successMessage = "Your password has been reset and you have been logged in."
          //setTimeout(() => this.router.navigate(['/guild']), 500);
        },
        error: (e) => {
          console.error(e.error)
          this.errorMessage = e.error.errorMessage
        }
      }
    )
  }
}
