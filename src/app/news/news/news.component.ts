import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: any;

  constructor(private newsService: NewsService) { }

  getDate(date: string) {
    return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`
  }

  ngOnInit() {
    this.newsService.getNews().subscribe(
      (news: any) => {
        this.news = news.newsData;
      }
    )
  }

}
