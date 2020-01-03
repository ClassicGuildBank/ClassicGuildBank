import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/authInterceptor';
import { CredentialInterceptor } from './core/credential.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot([
        { path: 'patreon', loadChildren: './patreon/patreon.module#PatreonModule' },
        { path: 'user', loadChildren: './user/user.module#UserModule' },
        { path: 'guild', loadChildren: './guild/guild.module#GuildModule' },
        { path: 'request', loadChildren: './request/request.module#RequestModule'},
        { path: 'requests', loadChildren: './requests/requests.module#RequestsModule'},
        { path: '', redirectTo: 'guild', pathMatch: 'full' },
        { path: '**', redirectTo: 'guild' },
    ], {useHash: true})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    }, 
    {
       provide: HTTP_INTERCEPTORS,
       useClass: CredentialInterceptor,
       multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
