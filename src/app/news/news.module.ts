import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsPage } from './news.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NewsPageRoutingModule } from './news-routing.module';
import { NewsComponent } from './news/news.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage, NewsComponent]
})
export class NewsPageModule {}
