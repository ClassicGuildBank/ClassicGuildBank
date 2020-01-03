import { ListFilterComponent } from "src/app/shared/components/list-filter.component";
import { ListItem } from "src/app/models/guildbank/list-item";
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChange, SimpleChanges } from "@angular/core";

@Component({
    selector: 'cgb-guild-filter',
    templateUrl: '../../shared/components/list-filter.component.html',
    styleUrls: ['../../shared/components/list-filter.component.css']
})
export class GuildListFilterComponent extends ListFilterComponent<ListItem> implements OnInit, OnChanges, AfterViewInit {
    
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