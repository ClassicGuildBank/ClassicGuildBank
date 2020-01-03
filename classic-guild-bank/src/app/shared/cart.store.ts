import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, forkJoin } from 'rxjs';
import { CartItem } from '../models/guildbank/cart-item';
import { GuildStore } from './guild.store';
import { IMoney } from '../models/guildbank/money.interface';
import { RequestItemModel } from '../models/guild/requestItemModel';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class CartStore {

  //maybe keep this in session
  private _cart: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  public cart$: Observable<CartItem[]> = this._cart.asObservable();

  private _requestedGold: BehaviorSubject<IMoney> = new BehaviorSubject({gold: 0, goldAmt: 0, silverAmt: 0, copperAmt: 0});
  public requestedGold$: Observable<IMoney> = this._requestedGold.asObservable();

  public availableGold$: Observable<IMoney> = this.guildStore.guildMoney$;

  public _itemCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public itemCount$: Observable<number> = this._itemCount.asObservable();

  constructor(
    private guildStore: GuildStore
  ) {     
  }

  public addItemToCart(item: CartItem) {
    let cart = this._cart.value;

    const index = cart.findIndex( i => i.item.id == item.item.id);
    if( index >= 0 ){
        const i = cart[index];
        cart[index].quantity.setValue( i.quantity.value, {emitEvent: false});
        cart = [...cart];
    } 
    else {
      cart = [...cart, item]
    }

    let itemCount = cart.length;
    if( this._requestedGold.value.gold > 0 ) {
      itemCount++;
    }
    
    this._cart.next(cart);
    this._itemCount.next(itemCount);
  }

  public addGoldToCart(formValue: any) {
    
    const money = {
      get gold() {return (this.goldAmt * 10000) + (this.silverAmt * 100) + this.copperAmt;} ,
      goldAmt: formValue.gold ? +formValue.gold : 0,
      silverAmt: formValue.silver ?  +formValue.silver: 0,
      copperAmt: formValue.copper ? +formValue.copper : 0
    }

    let cart = this._cart.value;

    let itemCount = cart.length;
    if( money.gold > 0 ) {
      itemCount++;
    }

    this._itemCount.next(itemCount);

    this._requestedGold.next(money);
  }

  public getQuantityInCart(item: CartItem): number {
    let cart = this._cart.value;
    const index = cart.findIndex( i => i.item.id == item.item.id);

    if ( index < 0 ) {
      return 0;
    }
    const i = cart[index];
    return +i.quantity.value;
  } 

  public removeFromCart(item: CartItem) {
      var cart = this._cart.value;

      var removedItemIndex = cart.findIndex(i => i.item.id == item.item.id);

      cart.splice(removedItemIndex, 1);

      this._cart.next(cart);
  }

  public submitRequest(characterName: string) {
    var requestItemModels = [];

    this._cart.value.forEach( cartItem => {
      var requestItemModel = new RequestItemModel({
        itemId: cartItem.item.id,
        quantity: cartItem.quantity.value
      });

      requestItemModels.push(requestItemModel);
    });

    return this.guildStore.requestItems(characterName, this._requestedGold.value.gold, requestItemModels).pipe(tap({ 
      next: () => { 
        this._cart.next([]);

        this.addGoldToCart({gold: 0, silver: 0, copper: 0});
      }
    }));
  }
}
