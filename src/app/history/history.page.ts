import { Component } from '@angular/core';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})
export class HistoryPage {
  component = HistoryComponent;

  constructor() {}

}
