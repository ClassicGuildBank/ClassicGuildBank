import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, switchMap, map, catchError, tap, shareReplay } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'cgb-confirm-email',
  templateUrl: './confirm-email.component.html'
})
export class ConfirmEmailComponent implements OnInit {

  public confirmed = false;
  public isLoading = true;
  private userName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {

    this.activatedRoute.queryParamMap.pipe(
      take(1),
      switchMap( map => {
        this.userName = map.get('userName');
        const code = map.get('code');

        return this.userService.confirmEmail(this.userName, code);
      }),
      map( () => true),
      catchError( () => of(false)),
      tap(() => this.isLoading = false ))
      .subscribe( {
        next: v => this.confirmed = v,
        error: e => {  console.log(e); this.confirmed = false;}
      });
  }

  resend() {
    //this.userService.resendConfirmation(this.userName);
  }
}
