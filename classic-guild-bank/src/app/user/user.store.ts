import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { TOKEN_NAME, TOKEN_EXPIRATION, LOGGED_IN_USER } from "../shared/constants";
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class UserStore {
    
    private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedIn());
    public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

    constructor(private userService: UserService) {
    }

    public isLoggedIn() {
      var token = this.getToken();
      var tokenExpiration = this.getTokenExpiration();

      return !(token === null || token.length == 0 || tokenExpiration === null || tokenExpiration < new Date());
    }

    public login( formValue: any ) {
        return this.userService.login(formValue).pipe(tap({
          next: result => {
            const token = result.token;
            this.setToken( token["token"] );
            this.setTokenExpiration( token["expiration"] );
            this.setLoggedInUser( token["user"])
            this._isLoggedIn.next(true);
          }
        }));
    }

    public logout() {
      return this.userService.logout().pipe(tap({
        next: result => {
          this.clearToken();
          this.clearTokenExpiration();
          this.clearLoggedInUser();
          this._isLoggedIn.next(false);
        },
        error: e => {
          this.clearToken();
          this.clearTokenExpiration();
          this.clearLoggedInUser();
          this._isLoggedIn.next(false);
        }
      }));
    }

    public registerUser( formValue: any ) {
      return this.userService.registerUser(formValue);
    }

    public sendResetPasswordEmail( formValue: any ){
      return this.userService.sendResetPasswordEmail(formValue)
    }

    public sendConfirmationEmail( formValue: any ) {
      return this.userService.sendConfirmationEmail( formValue );
    }

    public resetPassword( formValue: any ) {
      return this.userService.resetPassword(formValue).pipe(tap(result => {
        this.setToken( result["token"]);
        this.setTokenExpiration( result["expiration"]);
        this.setLoggedInUser(result["user"]);
        this._isLoggedIn.next(true);
      }));
    }
    
    public getToken(): string {
        return localStorage.getItem(TOKEN_NAME);
    }

    private clearToken(): void {
        localStorage.removeItem(TOKEN_NAME);
    }

    private setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
    }

    private clearTokenExpiration(): void {
        localStorage.removeItem(TOKEN_EXPIRATION);
    }

    private getTokenExpiration(): Date {
        return new Date(localStorage.getItem(TOKEN_EXPIRATION));
    }

    private setTokenExpiration(tokenExpiration: Date): void {
        localStorage.setItem(TOKEN_EXPIRATION, tokenExpiration.toString());
    }

    private clearLoggedInUser(): void {
        localStorage.removeItem(LOGGED_IN_USER);
    }

    public getLoggedInUser(): string {
        return localStorage.getItem(LOGGED_IN_USER);
    }

    private setLoggedInUser(token: string): void {
        localStorage.setItem(LOGGED_IN_USER, token);
    }
  }  