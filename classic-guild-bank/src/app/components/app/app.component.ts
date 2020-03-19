import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserStore } from 'src/app/user/user.store';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

import { Router, NavigationStart } from '@angular/router';
import { GuildStore } from 'src/app/shared/guild.store';
import { ModalService } from 'src/app/core/modal.service';
import { ErrorComponent } from 'src/app/shared/components/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _isGuildOwner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isGuildOwner$: Observable<boolean> = this._isGuildOwner.asObservable();

  private _userCanUpload: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userCanUpload$: Observable<boolean> = this._userCanUpload.asObservable();

  private _userCanProcessItemRequests: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userCanProcessItemRequests$: Observable<boolean> = this._userCanProcessItemRequests.asObservable();

  private _itemRequestCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public itemRequestCount$: Observable<number> = this._itemRequestCount.asObservable();

  private _isLoginPage: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoginPage$: Observable<boolean> = this._isLoginPage.asObservable();

  private _isReadonly: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isReadonly$: Observable<boolean> = this._isReadonly.asObservable();

  public authorized$: Observable<boolean>;
  public loggedInUser: string;

  public showError: boolean;
  public errorText: string;

  public showImportFromAddonModal = false;

  constructor(
    private vcr: ViewContainerRef,
    private userStore: UserStore,
    private router: Router,
    private guildStore: GuildStore,
    private modalService: ModalService,
  ) {

    this.authorized$ = this.userStore.isLoggedIn$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._isLoginPage.next(event.url.startsWith("/user/login"));
        this._isReadonly.next(event.url.startsWith("/guild/readonly"))
      }
    });
  }

  public ngOnInit() {
    this.modalService.setRootViewContainerRef(this.vcr);
    this.loggedInUser = this.userStore.getLoggedInUser();

    this.authorized$.subscribe((authorized) => {
      this.updateGuilds(authorized);
    });

    this.guildStore.guild$.subscribe((guild) => {
      var isGuildOwner = guild != null && guild.userIsOwner;
      var userCanUpload = guild != null && guild.userCanUpload;

      //TODO: Make this a separate setting? Stick with upload permissions for now.
      var userCanProcessItemRequests = guild != null && (guild.userIsOwner || guild.userCanUpload); //guild.userCanProcessItemRequests 

      this._isGuildOwner.next(isGuildOwner);
      this._userCanUpload.next(userCanUpload);
      this._userCanProcessItemRequests.next(userCanProcessItemRequests);

      this.guildStore.getItemRequests().subscribe();
    });

    this.guildStore.itemRequests$.subscribe((itemRequests) => {
      var itemRequestCount = itemRequests.filter(itemRequest => itemRequest.status == "Pending").length;

      this._itemRequestCount.next(itemRequestCount);
    });
  }

  public onError(error: string) {
    this.modalService.openModal(ErrorComponent, { message: error });
  }

  public onImportFromAddonClicked() {
    this.showImportFromAddonModal = true;
  }

  public onImportFromAddonModalClosed() {
    this.showImportFromAddonModal = false;
  }

  public onImportStringUploaded() {
    this.guildStore.updateCharacters();
  }

  private updateGuilds(authorized) {
    if (!authorized) {
      this.guildStore.clearGuilds();
      return;
    }

    this.guildStore.getGuilds().subscribe({
      error: () => this.onError("Unable to Get Guilds")
    });
  }
}
