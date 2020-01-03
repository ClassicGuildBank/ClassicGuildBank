import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { take, map, switchMap, tap, delay, takeUntil } from 'rxjs/operators';
import { UserStore } from './user.store';
import { GuildStore } from '../shared/guild.store';
import { Guild } from '../models/guildbank/guild';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styles: []
})
export class InviteComponent implements OnInit {

  public progress: number;
  public statusMessage: string = 'Processing Guild Invite...';
  public errorMessage: string;

  private token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userStore: UserStore,
              private guildStore: GuildStore,
              private router: Router) {

    this.activatedRoute.paramMap.pipe(take(1)).subscribe( map => this.token = map.get('guildToken'));
  }
    

  ngOnInit() {

    if(!this.userStore.isLoggedIn()){
      this.router.navigate(['/user', 'login', this.token]);
      return;
    }

    this.guildStore.getGuildFromToken(this.token).pipe(
      tap({
        next: guild => {
          this.statusMessage = `Joining ${guild.name}...`;
          this.progress = 33;
        },
        error: err => {
          this.errorMessage = err.error.errorMessage;
          this.progress = 100;
        }
      }),
      delay(250),
      tap({next: () => this.progress = 66}),
      switchMap(guild => this.guildStore.joinGuild(guild.id)),
      tap({
        next: guild => {
          this.statusMessage = `Successfully Joined ${guild.name}`;
          this.progress = 80;
        }
      }),
      delay(250),
      switchMap( guild => this.guildStore.getGuilds()),
      tap({
        next: () => {
          this.progress = 100;
          this.router.navigate(['']);
        }
      }))
      .subscribe();
  }

}
