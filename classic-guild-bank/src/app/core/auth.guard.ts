import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserStore } from '../user/user.store';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userStore: UserStore) {}

    canActivate(): boolean | Observable<boolean> {

        const loggedIn = this.userStore.isLoggedIn();
        
        if(!loggedIn)
            this.router.navigate(['/user/login']);

        return loggedIn;
    }
}
