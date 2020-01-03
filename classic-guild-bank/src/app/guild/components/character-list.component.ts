import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/guildbank/character';
import { ListItem } from 'src/app/models/guildbank/list-item';
import { ItemClassComparator, ItemSubClassComparator, ItemNameComparator, ItemQuantityComparator } from 'src/app/shared/list-item.comparator';

@Component({
  selector: 'cgb-character-list',
  templateUrl: './character-list.component.html',
  styles: []
})
export class CharacterListComponent implements OnInit {

  @Input() character: Character;
  
  public listData: ListItem[];
  filteredData: ListItem[] = [];

  public classComparator = new ItemClassComparator();
  public subclassComparator = new ItemSubClassComparator();
  public nameComparator = new ItemNameComparator();
  public quantityComparator = new ItemQuantityComparator();
  
  constructor() { }

  ngOnInit() {
    this.listData = [];
    this.character.bags.forEach( bag => {
      bag.bagSlots.forEach( bs => {

        if( !bs.item )
          return;

        const index = this.listData.findIndex( l => l.item.id === bs.item.id );
        let listItem: ListItem;
        if( index < 0 )
        {
          listItem = new ListItem(bs.item);            
          this.listData.push(listItem);
        }
        else
          listItem = this.listData[index];

        listItem.quantity += bs.quantity

      })
    });

  }

  onFiltered(data) {
    this.filteredData = data;
  }
}
