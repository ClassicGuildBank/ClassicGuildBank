import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStore } from './user.store';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loggedOut = false;
  public loggingIn = false;

  public errorText = '';
  public errorAction = '';
  public successText = '';

  public showRegisterModal = false;
  public showResetPassword = false;
  get showLogin() { return !this.showRegisterModal && !this.showResetPassword; }

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    guildToken: new FormControl('')
  });

  private styles: string[] = ['orgrimmar', 'stormwind'];
  private styleIndex: number = 0;
  public background$: BehaviorSubject<string> = new BehaviorSubject("../../assets/orgrimmar.jpg");

  constructor(
    private router: Router,
    private userStore: UserStore,
    private activatedRoute: ActivatedRoute
  ) { 
  }

  ngOnInit() {

    this.activatedRoute.paramMap.pipe(take(1)).subscribe(map => {
      const token = map.get('guildToken');
      if( token ) {
        this.loginForm.get('guildToken').setValue(token);
      }
    });

    setInterval(() => {
      this.styleIndex++;
      if(this.styleIndex === this.styles.length)
        this.styleIndex = 0;

      this.background$.next(`../../assets/${this.styles[this.styleIndex]}.jpg`);
    }, 15000);
  }

  public onLogin() {
    this.errorText = '';
    this.errorAction = '';
    this.loggingIn = true;
    
    this.userStore.login(this.loginForm.value).subscribe({
      next: result => {
        this.router.navigate(['/'])
        this.loggingIn = false;
      },
      error: err => {
        if( err.error && err.error.errorMessage ) {
          this.errorText = err.error.errorMessage;
          this.errorAction = err.error.errorAction;
        }
        else {
          this.errorText = "Unable to login to Classic Guild Bank";
        }
        this.loggingIn = false;
      },
    })
  }

  public registerAccount() {
    this.showRegisterModal = true;
  }

  public onRegisterClosed() {
    this.showRegisterModal = false;
  }

  public resetPassword() {
    this.showResetPassword = true;
  }

  public onResetClosed() {
    this.showResetPassword = false;
  }

  public onErrorAction() {
    if(this.errorAction && this.errorAction == 'Resend Confirmation') {

      const formValue = this.loginForm.value;
      delete formValue.password;

      this.userStore.sendConfirmationEmail(formValue).subscribe({
        next: result => {
          this.successText = "Email Confirmation Successfully Sent.";
          this.errorText = '';
        }
      });
    }
  }
}
