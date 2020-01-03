import { ClrDatagridComparatorInterface } from "@clr/angular";
import { ListItem } from "../models/guildbank/list-item";
import { CartItem } from "../models/guildbank/cart-item";
import { ItemRequest } from "../models/guildbank/ItemRequest";

export class ItemClassComparator implements ClrDatagridComparatorInterface<ListItem> {
    compare(a: ListItem, b: ListItem) {
        return a.item.class - b.item.class
    }
}

export class ItemSubClassComparator implements ClrDatagridComparatorInterface<ListItem> {
    compare(a: ListItem, b: ListItem) {
        return a.item.subclass - b.item.subclass
    }
}

export class ItemNameComparator implements ClrDatagridComparatorInterface<ListItem> {
    compare(a: ListItem, b: ListItem) {
        
        if (a.item.name > b.item.name) {
            return 1;
        }

        if (a.item.name < b.item.name) {
            return -1;
        }

        return 0;
    }
}

export class ItemQuantityComparator implements ClrDatagridComparatorInterface<ListItem> {
    compare(a: ListItem, b: ListItem) {
       return a.quantity - b.quantity;
    }
}

export class ItemAvailableComparator implements ClrDatagridComparatorInterface<CartItem> {
    compare(a: CartItem, b: CartItem) {
       return a.available - b.available;
    }
}

export class CartItemQuantityComparator implements ClrDatagridComparatorInterface<CartItem> {
    compare(a: CartItem, b: CartItem) {
       return a.quantity.value - b.quantity.value;
    }
}

export class ItemRequestCharacterNameComparator implements ClrDatagridComparatorInterface<ItemRequest> {
    compare(a: ItemRequest, b: ItemRequest) {
        
        if (a.characterName > b.characterName) {
            return 1;
        }

        if (a.characterName < b.characterName) {
            return -1;
        }

        return 0;
    }
}

export class ItemRequestDateComparator implements ClrDatagridComparatorInterface<ItemRequest> {
    compare(a: ItemRequest, b: ItemRequest) {
        
        if (a.dateRequested > b.dateRequested) {
            return 1;
        }

        if (a.dateRequested < b.dateRequested) {
            return -1;
        }

        return 0;
    }
}

export class ItemRequestGoldComparator implements ClrDatagridComparatorInterface<ItemRequest> {
    compare(a: ItemRequest, b: ItemRequest) {
        
        if (a.gold > b.gold) {
            return 1;
        }

        if (a.gold < b.gold) {
            return -1;
        }

        return 0;
    }
}

export class ItemRequestStatusComparator implements ClrDatagridComparatorInterface<ItemRequest> {
    compare(a: ItemRequest, b: ItemRequest) {
        
        if (a.status > b.status) {
            return 1;
        }

        if (a.status < b.status) {
            return -1;
        }

        return 0;
    }
}
