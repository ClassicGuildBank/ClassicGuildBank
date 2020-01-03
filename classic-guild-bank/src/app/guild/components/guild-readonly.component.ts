import { Component, OnInit } from '@angular/core';
import { GuildStore } from '../../shared/guild.store';
import { ActivatedRoute } from '@angular/router';
import { take, switchMap, map, shareReplay, tap } from 'rxjs/operators';
import { Guild } from '../../models/guildbank/guild';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/guildbank/character';

@Component({
  selector: 'app-guild-readonly',
  templateUrl: './guild-readonly.component.html',
})
export class GuildReadonlyComponent implements OnInit {

  public guild$: Observable<Guild>;
  public characters$: Observable<Character[]>;
  public guildReadonlyLoading$: Observable<boolean>;

  constructor(
    private guildStore: GuildStore,
    private route: ActivatedRoute
  ) { 
    this.guild$ = guildStore.guildReadonly$; 
    this.guildReadonlyLoading$ = this.guildStore.guildReadonlyLoading$;

    this.route.paramMap.subscribe(params => {
        this.guildStore.updateReadonlyGuildFromReadonlyToken(params.get('token'))
    });

    this.characters$ = this.guild$.pipe(map( g => g.characters));
  }

  ngOnInit() {
  }
}
