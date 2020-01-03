import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CGBEncoder } from '../core/encoder';

import * as configuration from '../../config/appconfig.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUri: string;

  constructor(private httpClient: HttpClient) {
    this.serviceUri = `${configuration.api}/auth`;
  }

  public registerUser(formValue: any) {
    return this.httpClient.post(this.serviceUri + '/register', formValue).pipe(shareReplay());
  }

  public sendResetPasswordEmail(formValue: any) {
    return this.httpClient.post(this.serviceUri + '/sendResetPasswordEmail', formValue).pipe(shareReplay());
  }

  public sendConfirmationEmail(formValue: any) {
    return this.httpClient.post(this.serviceUri+'/sendConfirmationEmail', formValue).pipe(shareReplay());
  }

  public resetPassword(formValue: any) {
    return this.httpClient.post(this.serviceUri + '/resetPassword', formValue).pipe(shareReplay());
  }

  public login(formValue: any): Observable<any> {
    return this.httpClient.post(this.serviceUri + '/login', formValue).pipe(shareReplay());
  }

  public logout() {
    return this.httpClient.post(this.serviceUri + '/logout', {}).pipe(shareReplay());
  }

  public isLoggedIn() {
    return this.httpClient.get(this.serviceUri + '/me');
  }

  public confirmEmail(userName: string, code: string) {
    let params = new HttpParams({encoder: new CGBEncoder()})
    params = params.append('username', userName);
    params = params.append('code', code);

    return this.httpClient.get(this.serviceUri + '/confirm', {params: params});
  }
}
