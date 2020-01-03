import { ListFilterComponent } from "src/app/shared/components/list-filter.component";
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { CartItem } from "../models/guildbank/cart-item";

@Component({
    selector: 'cgb-request-filter',
    templateUrl: '../shared/components/list-filter.component.html',
    styleUrls: ['../shared/components/list-filter.component.css']
})
export class RequestListFilterComponent extends ListFilterComponent<CartItem> implements OnInit, OnChanges, AfterViewInit {
    
    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }
}