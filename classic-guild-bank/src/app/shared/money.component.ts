import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/guildbank/character';
import { IMoney } from 'src/app/models/guildbank/money.interface';

@Component({
  selector: 'cgb-money',
  templateUrl: './money.component.html',
  styles: []
})
export class MoneyComponent implements OnInit {

  @Input() 
  public money: IMoney;

  constructor() { }

  ngOnInit() {
  }

}
