import { ClrDatagridStringFilterInterface, ClrDatagridFilterInterface } from "@clr/angular";
import { ListItem } from "../models/guildbank/list-item";

export const ListItemNameFilter: ClrDatagridStringFilterInterface<ListItem> = {
    accepts(item: ListItem, search: string) {
        return item.item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    }
}
