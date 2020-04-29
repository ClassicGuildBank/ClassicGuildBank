import { Component, OnInit } from '@angular/core';
import { IModalComponent } from 'src/app/core/modal-component.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styles: []
})
export class DonateComponent implements OnInit, IModalComponent {

  constructor() { }

  destroy$?: Subject<boolean> = new Subject<boolean>();
  public copyEth = "Copy";
  public copyBtc = "Copy";

  public ethAddr = "0x65Cc00C089425f85f2471CcDaB9e6e338bC84B3F";
  public btcAddr = "1Ca9mMK1uQCWRw8N6gJm5kefqhKXwuSpGc"

  setData(data: any) {  
  }

  ngOnInit() {
  }

  public close() {
    this.destroy$.next(true);
  }

  public notifyEthCopied(e: String) {
    console.log(e);
    this.copyEth = "Copied";
  }

  public notifyBtcCopied(e: String) {
    console.log(e);
    this.copyBtc = "Copied";
  }

}
