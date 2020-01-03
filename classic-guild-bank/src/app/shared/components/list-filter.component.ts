import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ItemCategories, ItemCategory, ItemSubCategory } from 'src/app/models/guildbank/item-category';
import { FormGroup, FormControl } from '@angular/forms';
import { IItemParent } from 'src/app/models/guildbank/item-parent.interface';
@Component({
  selector: 'cgb-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.css']
})
export class ListFilterComponent<T extends IItemParent> implements OnInit, OnChanges, AfterViewInit {
  @Input() public filterName: string;
  @Input() public data: T[];
  @Input() public showCategories: boolean = true;

  @Output() public filtered: EventEmitter<T[]> = new EventEmitter();
  
  public categories: ItemCategory[] = ItemCategories;
  public subcategories: ItemSubCategory[];

  public filter = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(null),
    subcategory: new FormControl(null)
  })

  get name() {
    return this.filter.get('name');
  }

  get category() {
    return this.filter.get('category');
  }

  get subcategory() {
    return this.filter.get('subcategory');
  }

  get selectedCategory() {
    return this.filter.get('category').value;
  }

  @ViewChild('nameInput', {read: ElementRef, static: false}) nameInput:ElementRef; 
  constructor() { }

  ngOnInit() {
    this.name.valueChanges.subscribe( () => this.filterRecords() );

    this.category.valueChanges.subscribe( (value) => {
      if(value){ 
        const cat = ItemCategories.find( i => i.value === +value);
        this.subcategories = cat.subCategories;
      }
      else {
        this.subcategories = undefined;
      }

      this.filterRecords();
    });

    this.subcategory.valueChanges.subscribe( () => this.filterRecords() );

    this.filter.valueChanges.subscribe( filter => {
      localStorage.setItem(this.filterName, JSON.stringify(filter));
    });

    const filter = localStorage.getItem(this.filterName);
    if(filter) {
      this.filter.setValue(JSON.parse(filter));
    }

    this.filterRecords();
  }

  ngOnChanges( changes: SimpleChanges ) {
    if(changes.data) {
      this.filterRecords();
    }
  }

  ngAfterViewInit() {

    if(this.nameInput && this.nameInput.nativeElement.parentElement){  
        
        this.nameInput.nativeElement.parentElement.style.width = '100%';

        if( this.nameInput.nativeElement.parentElement.parentElement ){
          this.nameInput.nativeElement.parentElement.parentElement.style.width = '100%';
        }
    }
  }

  public onClearFilter() {
    this.name.setValue('');
    this.category.setValue(null);
    this.subcategory.setValue(null);
  }

  private filterRecords() {

    if(!this.data){
      this.filtered.emit([]);
      return;
    }

    var records = [...this.data];
    if( this.category.value ){
      var cat = +this.category.value;
      records = records.filter( r => r.item.class === cat )
    }
    
    if( this.subcategory.value ) {
      var sub = +this.subcategory.value;
      records = records.filter( r => r.item.subclass === sub )
    }

    if( this.name.value && this.name.value.toString().length > 0 )
    {
      const query = this.name.value.toString().toLowerCase();
      records = records.filter( r => r.item.name.toLowerCase().indexOf(query) >= 0);
    }

    this.filtered.emit(records);
  }
}
