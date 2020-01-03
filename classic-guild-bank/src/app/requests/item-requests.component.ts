import { Component, OnInit } from '@angular/core';
import { GuildStore } from '../shared/guild.store';
import { ItemRequest } from '../models/guildbank/ItemRequest';
import { ModalService } from '../core/modal.service';
import { ErrorComponent } from '../shared/components/error.component';
import { ItemNameComparator, ItemRequestCharacterNameComparator, ItemQuantityComparator, ItemRequestDateComparator, ItemRequestGoldComparator, ItemRequestStatusComparator } from '../shared/list-item.comparator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-requests',
  templateUrl: './item-requests.component.html'
})
export class ItemRequestsComponent implements OnInit {

  private itemRequests: ItemRequest[];

  public guildsLoading$: Observable<boolean>;
  public itemRequestsLoading$: Observable<boolean>;
  
  public filteredItemRequests: ItemRequest[];

  public showOpenRequestsOnly: Boolean;

  public nameComparator = new ItemNameComparator();
  public quantityComparator = new ItemQuantityComparator();

  public itemRequestCharacterNameComparator = new ItemRequestCharacterNameComparator();
  public itemRequestDateComparator = new ItemRequestDateComparator();
  public itemRequestGoldComparator = new ItemRequestGoldComparator();
  public itemRequestStatusComparator = new ItemRequestStatusComparator();

  constructor(
    private guildStore: GuildStore,
    private modalService: ModalService,
  ) {
    this.showOpenRequestsOnly = true;

    this.guildsLoading$ = this.guildStore.guildsLoading$;
    this.itemRequestsLoading$ = this.guildStore.itemRequestsLoading$;
  }

  ngOnInit() {
    this.guildStore.guild$.subscribe((guild) => {
      this.guildStore.getItemRequests().subscribe();
    });

    this.guildStore.itemRequests$.subscribe((itemRequests) => {
      this.itemRequests = itemRequests;
      this.updateFilteredItemRequests();
    });
  }

  public onApproveItemRequest(itemRequest) {
    this.guildStore.approveItemRequest(itemRequest.id).subscribe({
      error: () => this.modalService.openModal(ErrorComponent, { message: "Unable to Approve Item Request" })
    });
  }

  public onDenyItemRequest(itemRequest) {
    this.guildStore.denyItemRequest(itemRequest.id).subscribe({
      error: () => this.modalService.openModal(ErrorComponent, { message: "Unable to Deny Item Request" })
    });
  }

  public showOpenRequestsOnlyToggled() {
    this.updateFilteredItemRequests();
  }

  private updateFilteredItemRequests() {
    this.filteredItemRequests = this.itemRequests.filter(itemRequest => !this.showOpenRequestsOnly || itemRequest.status == 'Pending');
  }
}
