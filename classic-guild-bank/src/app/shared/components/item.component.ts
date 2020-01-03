import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/guildbank/item';
import { WowheadImagePipe } from '../../core/wowhead-image.pipe';

@Component({
  selector: 'cgb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() size: string = 'medium';
  @Input() quantity: number = 0;
  @Input() disableLink: boolean = false;

  get leftMargin() {
    if ( this.quantity == 20 ) {
      return 
    }
  }

  get itemStyle() {
    const style = {
      'margin-top': '15px',
      'margin-left': '-20px'
    };

    if( this.quantity < 10 )
      style['margin-left'] = '-11px';
    if( this.quantity < 20 )
      style['margin-left'] = '-15px';

    return style;
  }

  get itemUrl() {
      var pipe = new WowheadImagePipe();
      return `url( ${pipe.transform(this.item, {size: this.size})} )`;
  }

  constructor() { }

  ngOnInit() {
  }

}
