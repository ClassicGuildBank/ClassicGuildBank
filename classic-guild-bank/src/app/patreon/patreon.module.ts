import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PatreonCallbackComponent } from './patreon-callback.component';
import { AuthGuard } from '../core/auth.guard';


@NgModule({
  declarations: [
      PatreonCallbackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'callback', component: PatreonCallbackComponent, canActivate: [AuthGuard]}        
    ]),
  ],
  exports: [
    PatreonCallbackComponent
  ]
})
export class PatreonModule { }
