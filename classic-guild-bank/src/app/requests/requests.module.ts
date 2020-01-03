import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { ItemRequestsComponent } from './item-requests.component';
import { MyRequestsComponent } from './my-requests.component';

@NgModule({
  declarations: [
    ItemRequestsComponent,
    MyRequestsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ItemRequestsComponent, canActivate: [AuthGuard]},
      {path: 'myrequests', component: MyRequestsComponent, canActivate: [AuthGuard]}
    ])
  ]
})
export class RequestsModule { }
