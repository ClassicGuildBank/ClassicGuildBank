import { Subject } from "rxjs";

export interface IModalComponent {
    destroy$?: Subject<boolean>;
    setData(data: any)
}