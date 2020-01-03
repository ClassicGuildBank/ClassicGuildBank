import { Injectable, ViewContainerRef, ComponentFactoryResolver, Type } from "@angular/core";
import { IModalComponent } from "./modal-component.interface";
import { take, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    vcr: ViewContainerRef;
    constructor(private cfr: ComponentFactoryResolver){

    }

    public setRootViewContainerRef(ref: ViewContainerRef) {

        if(this.vcr) {
            console.warn('View Container Ref already set. Modal Service should only be initialized once.')
            return;
        }

        this.vcr = ref;
    }

    public openModal(component: Type<IModalComponent>, data?: any) {

        const factory = this.cfr.resolveComponentFactory(component);
        const ref = factory.create(this.vcr.parentInjector);

        (<IModalComponent>ref.instance).setData(data);

        setTimeout(() => this.vcr.insert(ref.hostView));

        return (<IModalComponent>ref.instance)
            .destroy$.asObservable().pipe(
                take(1),
                tap(() => ref.destroy())).toPromise();
    }
}