// import { Component, OnInit } from '@angular/core';
// import { IModalComponent } from '../../core/modal-component.interface';
// import { Subject, Observable } from 'rxjs';
// import { CartStore } from '../cart.store';
// import { CartItem } from 'src/app/models/guildbank/cart-item';
// import { IMoney } from 'src/app/models/guildbank/money.interface';
// import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
// import { takeUntil } from 'rxjs/operators';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styles: []
// })
// export class CartComponent implements OnInit, IModalComponent {
 
//   public destroy$?: Subject<boolean> = new Subject();
//   public cartItems$: Observable<CartItem[]> = this.cartStore.cart$;
//   public availableGold$: Observable<IMoney> = this.cartStore.availableGold$;

//   public goldForm: FormGroup = new FormGroup({
//     gold: new FormControl(0),
//     silver: new FormControl(0),
//     copper: new FormControl(0)
//   });

//   public get gold() {return this.goldForm.get('gold');}
//   public get silver() {return this.goldForm.get('silver');}
//   public get copper() {return this.goldForm.get('copper');}

//   constructor(private cartStore: CartStore) { }

//   ngOnInit() {
//     this.cartStore.requestedGold$.pipe(takeUntil(this.destroy$)).subscribe({
//       next: money => {
//         this.gold.patchValue(money.goldAmt);
//         this.silver.patchValue(money.silverAmt);
//         this.copper.patchValue(money.copperAmt);
//       }
//     })
//   }

//   ngOnDestroy() {
//     this.destroy$.next(true);
//     this.destroy$.unsubscribe();
//   }

//   setData(data: any) {
//   }

// }
