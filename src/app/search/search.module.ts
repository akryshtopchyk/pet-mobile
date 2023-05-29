import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SearchPageRoutingModule } from './search-routing.module';
import { StopsComponent } from './stops/stops.component';
import { SelectRouteComponent } from './select-route/select-route.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchPageRoutingModule,
  ],
  declarations: [SearchPage, StopsComponent, SelectRouteComponent, ConfirmComponent]
})
export class SearchPageModule {}
