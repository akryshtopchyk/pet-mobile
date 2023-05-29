import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss']
})
export class NewsPage {
  component = NewsComponent;

  constructor() {}

}
