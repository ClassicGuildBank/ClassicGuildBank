import { Component, OnInit } from '@angular/core';
import { GuildStore } from '../shared/guild.store';
import { ItemRequest } from '../models/guildbank/ItemRequest';
import { ItemNameComparator, ItemRequestCharacterNameComparator, ItemQuantityComparator, ItemRequestDateComparator, ItemRequestGoldComparator, ItemRequestStatusComparator } from '../shared/list-item.comparator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html'
})
export class MyRequestsComponent implements OnInit {

  public myItemRequests: ItemRequest[];

  public guildsLoading$: Observable<boolean>;
  public myItemRequestsLoading$: Observable<boolean>;

  public nameComparator = new ItemNameComparator();
  public quantityComparator = new ItemQuantityComparator();

  public itemRequestCharacterNameComparator = new ItemRequestCharacterNameComparator();
  public itemRequestDateComparator = new ItemRequestDateComparator();
  public itemRequestGoldComparator = new ItemRequestGoldComparator();
  public itemRequestStatusComparator = new ItemRequestStatusComparator();

  constructor(
    private guildStore: GuildStore
  ) {
    this.guildsLoading$ = this.guildStore.guildsLoading$;
    this.myItemRequestsLoading$ = this.guildStore.myItemRequestsLoading$;
  }

  ngOnInit() {
    this.guildStore.guild$.subscribe((guild) => {
      this.guildStore.getMyItemRequests().subscribe();
    });

    this.guildStore.myItemRequests$.subscribe((itemRequests) => {
      this.myItemRequests = itemRequests;
    });
  }
}
