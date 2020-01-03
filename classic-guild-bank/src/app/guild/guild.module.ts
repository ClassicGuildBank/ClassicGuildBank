import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { GuildComponent } from './components/guild.component';
import { CharacterBankComponent } from './components/characterbank.component';
import { AuthGuard } from '../core/auth.guard';
import { NoCharactersComponent } from './components/nocharacters.component';
import { ManageGuildComponent } from './components/manageguild.component';
import { GuildListComponent } from './components/guild-list.component';
import { CharacterListComponent } from './components/character-list.component';
import { GuildReadonlyComponent } from './components/guild-readonly.component';
import { TransactionListComponent } from './components/transaction-list.component';
import { GuildListFilterComponent } from './components/guild-list-filter.component';

@NgModule({
  declarations: [
      GuildComponent,
      CharacterBankComponent,
      NoCharactersComponent,
      ManageGuildComponent,
      GuildListComponent,
      CharacterListComponent,
      GuildListFilterComponent,
      GuildReadonlyComponent,
      TransactionListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        { path: '', component: GuildComponent, canActivate: [AuthGuard]},
        { path: 'manage', component: ManageGuildComponent, canActivate: [AuthGuard]},
        { path: 'readonly/:token', component: GuildReadonlyComponent }
    ]),
  ],
  exports: [
    GuildComponent,
    CharacterBankComponent,
    NoCharactersComponent,
    GuildListComponent,
    CharacterListComponent
  ]
})
export class GuildModule { }
