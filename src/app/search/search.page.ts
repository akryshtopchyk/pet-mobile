import { Component } from '@angular/core';
import { SelectRouteComponent } from './select-route/select-route.component';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  component = SelectRouteComponent;

}
