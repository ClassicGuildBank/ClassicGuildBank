import { Component, OnInit, Input } from '@angular/core';
import { GuildStore } from '../../shared/guild.store';
import { Observable } from 'rxjs';
import { Guild } from 'src/app/models/guildbank/guild';
import { ClrDatagridStateInterface } from '@clr/angular';
import { Transaction } from 'src/app/models/guild/transaction';

@Component({
  selector: 'cgb-transaction-list',
  templateUrl: './transaction-list.component.html',
  styles: []
})
export class TransactionListComponent implements OnInit {

  @Input() guild: Guild;
  
  public page$: Observable<number>;
  public transactionCount$: Observable<number>;
  public transactions$: Observable<Transaction[]>;
  public pageSize: number = 100;
  
  constructor(private store: GuildStore) { }

  ngOnInit() {
    this.page$ = this.store.transactionPage$;
    this.transactionCount$ = this.store.transactionCount$;
    this.transactions$ = this.store.transactions$;
    
    this.store.getTransactionCount(this.guild.id)
  }

  public gridRefresh(gridState: ClrDatagridStateInterface) {
    
    //This is when navigating away from the transactions grid.
    //Should we clear the page in the store?
    if(!gridState.page)
      return;

    this.pageSize = gridState.page.size;

    let pageNum = 1;
    if( (gridState.page.to + 1) > this.pageSize)
      pageNum = (gridState.page.to + 1) / this.pageSize

    this.store.getPageOfTransactions(this.guild.id, pageNum, this.pageSize);
  }
}
