import { Component, OnInit } from '@angular/core';
import { GuildStore } from '../shared/guild.store';
import { Observable } from 'rxjs';
import { Guild } from '../models/guildbank/guild';
import { map, tap } from 'rxjs/operators';
import { IMoney } from '../models/guildbank/money.interface';
import { CartItem } from '../models/guildbank/cart-item';
import { FormGroup, FormControl } from '@angular/forms';
import { maxGold } from '../shared/shared.validators';
import { CartStore } from '../shared/cart.store';
import { ItemNameComparator, ItemAvailableComparator, ItemClassComparator, ItemSubClassComparator, CartItemQuantityComparator } from '../shared/list-item.comparator';
import { ModalService } from '../core/modal.service';
import { ErrorComponent } from '../shared/components/error.component';

@Component({
  selector: 'app-request-items',
  templateUrl: './request-items.component.html',
  styleUrls: ['./request-items.component.css']
})
export class RequestItemsComponent implements OnInit {

  public charactersLoading$: Observable<boolean>;
  public guildsLoading$: Observable<boolean>;

  public cartItems$: Observable<CartItem[]> = this.cartStore.cart$;
  public requestedGold$: Observable<IMoney> = this.cartStore.requestedGold$;
  public itemCount$: Observable<number> = this.cartStore.itemCount$;

  public guild$: Observable<Guild>;
  public listData$: Observable<CartItem[]>;
  public guildMoney$: Observable<IMoney>;

  public nameComparator = new ItemNameComparator();
  public subclassComparator = new ItemSubClassComparator();
  public availableComparator = new ItemAvailableComparator();
  public classComparator = new ItemClassComparator();
  public quantityComparator = new CartItemQuantityComparator();

  public characterName: string;

  filteredData: CartItem[] = [];

  public goldForm: FormGroup = new FormGroup({
    gold: new FormControl(0),
    silver: new FormControl(0),
    copper: new FormControl(0)
  });

  public showSubmitSuccess: boolean = false;

  public get gold() {return this.goldForm.get('gold');}
  public get silver() {return this.goldForm.get('silver');}
  public get copper() {return this.goldForm.get('copper');}

  constructor(
    private guildStore: GuildStore, 
    private cartStore: CartStore,
    private modalService: ModalService,
  ) { 
    this.guildsLoading$ = this.guildStore.guildsLoading$;
    this.charactersLoading$ = this.guildStore.charactersLoading$;
  }

  ngOnInit() {
    this.guild$ = this.guildStore.guild$;
    this.guildMoney$ = this.guildStore.guildMoney$.pipe(tap({
      next: totalGold => this.goldForm.setValidators(maxGold(totalGold))
    }));

    this.guildStore.guild$.subscribe( (guild) => {
      if(!guild)
        return;
      
      this.guildStore.getGuildMembership().subscribe( () => {
        this.characterName = this.guildStore.getCurrentGuildMembership().displayName;
      });
    });   

    
    
    this.listData$ = this.guildStore.characters$.pipe(map(characters => {
      
      const itemList: CartItem[] = [];
      //this.guildMoney.gold = 0;

      characters.map( c => {
        return c.bags.map( b => b.bagSlots.map(bs => {
          if( !bs.item )
              return;

            const index = itemList.findIndex( l => l.item.id === bs.item.id );
            let listItem: CartItem;
            if( index < 0 )
            {
              listItem = new CartItem(bs.item);
              itemList.push(listItem);
            }
            else {
              listItem = itemList[index];
            }

            listItem.setAvailableAmount(listItem.available + bs.quantity);
        }))
      })
      return itemList;
    }));
  }

  addItemToCart(item: CartItem) {
  
    if( item.quantity.value > item.available ) {
      return;
    }

    //item.setAvailableAmount( item.available - (itemQuantity + quantity));
    this.cartStore.addItemToCart(item);
  }

  addGoldToCart() {
    this.cartStore.addGoldToCart(this.goldForm.value);
  }

  onFiltered(data: CartItem[]) {
    this.filteredData = data;
  }

  removeFromCart(item: CartItem) {
    this.cartStore.removeFromCart(item);
  }

  submitRequest() {

    if( !this.characterName ) {
      this.modalService.openModal(ErrorComponent, {message: "Character Name is Required"});
      return;
    }

    this.cartStore.submitRequest(this.characterName).subscribe({
      next: () => {
        this.showSubmitSuccess = true;
        this.goldForm.reset();
      },
      error: () => this.modalService.openModal(ErrorComponent, {message: "Unable to Submit Request"})
    });
  }

  clearSubmitSuccess() {
    this.showSubmitSuccess = false;
  }
}
