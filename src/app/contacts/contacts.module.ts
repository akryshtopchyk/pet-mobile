import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsPage } from './contacts.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ContactsPageRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { CallComponent } from './call/call.component';
import { PaymentsComponent } from './payments/payments.component';
import { QuestionsComponent } from './questions/questions.component';
import { RulesComponent } from './rules/rules.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ContactsPageRoutingModule,
  ],
  declarations: [
    ContactsPage,
    ContactsComponent,
    CallComponent,
    PaymentsComponent,
    QuestionsComponent,
    RulesComponent,
    TermsComponent,
  ],
})
export class ContactsPageModule {}
