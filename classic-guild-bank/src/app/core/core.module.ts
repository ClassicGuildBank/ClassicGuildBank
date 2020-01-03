import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WowheadUrlPipe } from './wowhead-url.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WowheadImagePipe } from './wowhead-image.pipe';
import { AuthInterceptor } from './authInterceptor';
import { AuthGuard } from './auth.guard';
import { CredentialInterceptor } from './credential.interceptor';
import { ErrorComponent } from '../shared/components/error.component'
import { ModalService } from './modal.service';
import { CopyClipboardDirective } from './copy-clipboard.directive';

@NgModule({
  declarations: [WowheadImagePipe, WowheadUrlPipe, CopyClipboardDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthInterceptor, CredentialInterceptor, AuthGuard],
  exports: [
    HttpClientModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    WowheadImagePipe,
    WowheadUrlPipe, 
    CopyClipboardDirective
  ],
  entryComponents: [ErrorComponent]
})
export class CoreModule { }
