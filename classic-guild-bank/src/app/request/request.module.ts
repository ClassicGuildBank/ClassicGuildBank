import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestItemsComponent } from './request-items.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { RequestListFilterComponent } from './request-list-filter.component';



@NgModule({
  declarations: [RequestItemsComponent, RequestListFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: RequestItemsComponent, canActivate: [AuthGuard]}
    ])
  ]
})
export class RequestModule { }
