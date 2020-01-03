import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { GoogleAdsenseComponent } from './google-adsense.component';
import { ErrorComponent } from './components/error.component';
import { ImportFromAddonComponent } from './import-from-addon.component';
import { AddGuildComponent } from './components/add-guild.component';
// import { CartComponent } from './components/cart.component';
import { ItemComponent } from './components/item.component';
import { MoneyComponent } from './money.component';
import { ListFilterComponent } from './components/list-filter.component';
import { GuildLoadingComponent } from './components/guild-loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    GoogleAdsenseComponent,
    ErrorComponent,
    ImportFromAddonComponent,
    AddGuildComponent,
    // CartComponent,
    ItemComponent,
    MoneyComponent,
    ListFilterComponent,
    GuildLoadingComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
  ],
  exports: [
      CoreModule,
      HeaderComponent,
      GoogleAdsenseComponent,
      ErrorComponent,
      ImportFromAddonComponent,
      AddGuildComponent,
      // CartComponent,
      ItemComponent,
      MoneyComponent,
      ListFilterComponent,
      GuildLoadingComponent
  ],
  entryComponents: [
    // CartComponent
  ]
})
export class SharedModule { }
