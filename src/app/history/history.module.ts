import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history/history.component';
import { ArchiveComponent } from './archive/archive.component';
import { FutureComponent } from './future/future.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HistoryPageRoutingModule
  ],
  declarations: [HistoryPage, HistoryComponent, ArchiveComponent, FutureComponent]
})
export class HistoryPageModule {}
