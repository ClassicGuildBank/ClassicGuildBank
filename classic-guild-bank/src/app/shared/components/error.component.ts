import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IModalComponent } from '../../core/modal-component.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'cgb-error',
  template: `
  <clr-modal [clrModalOpen]="true" (clrModalOpenChange)="openChanged()">
    <h3 class="modal-title">Error</h3>
    <div class="modal-body">
        <div class="alert alert-danger" role="alert">
            <div class="alert-items">
                <div class="alert-item static">
                    <div class="alert-icon-wrapper">
                        <clr-icon class="alert-icon" shape="exclamation-circle"></clr-icon>
                    </div>
                    <span class="alert-text">
                        {{message}}
                    </span>
                </div>
            </div>
        </div>
    </div>
  </clr-modal>
  `,
  styles: []
})
export class ErrorComponent implements OnInit, OnDestroy, IModalComponent {

  public size: string = 'modal-lg';
  public showError: boolean= true;
  public message: string;
  public destroy$?: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getModalClass() {
    return this.size;
  }

  setData(data: any) {
    this.message = data.message;
  }

  openChanged() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
