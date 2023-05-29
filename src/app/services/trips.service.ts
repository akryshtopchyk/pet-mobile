import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  url = environment.url;
  date: any;
  peopleCount: any;
  currentCity: any;
  cityTo: any;
  placeFrom: string;
  placeTo: string;
  sum: number;
  trip: any;
  isLogin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getRoutes() {
    return this.http.get(`${this.url}trip`);
  }

  createOrder() {}

  getOrders() {}

  deleteOrder() {}

  getTripsByDate(date: string, name: string) {
    return this.http.get(
      `${this.url}trip/date/${new Date(date).getFullYear()},${new Date(date).getMonth()},${new Date(date).getDate()},${new Date().getHours()},${new Date().getMinutes()}/${name}`
    );
  }
}
