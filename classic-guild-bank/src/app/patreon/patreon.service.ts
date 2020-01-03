import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PatreonToken } from '../models/patreon/patreon-token.model';

import * as configuration from '../../config/appconfig.json';

@Injectable({
  providedIn: 'root'
})
export class PatreonService {

  private serviceUri: string;
  constructor(private http: HttpClient) { 
    this.serviceUri = `${configuration.api}/patreon`
  }

  public callback(code: string): Observable<PatreonToken> {
    return this.http.get(`${this.serviceUri}/callback?code=${code}`).pipe(map(response => new PatreonToken(response)),shareReplay());
  }

  public isPatreon(): Observable<boolean> {
    return this.http.get(`${this.serviceUri}/me`).pipe(map( id => id !== null && id !== undefined ));
  }
}
