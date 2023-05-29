import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url = environment.url;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async getOrders() {
    const profile = await this.storageService.get('profile');
    if (profile && profile.phoneNumber) {
      return this.http.get(`${this.url}order/phone/${profile.phoneNumber}`).pipe(
        switchMap((orders: any) => {
          const ids = orders.orderData.map((order: any) => order.tripId)
          return this.http.post(`${this.url}trip/orders/${profile.phoneNumber}`, ids)
        })
      );
    } 
    return of([])
  }

  createOrder(order: any) {
    return this.http.post(`${this.url}order`, order)
  }

  deleteOrder(id: string) {
    return this.http.delete(`${this.url}order/${id}`)
  }

  getStops() {
    return this.http.get(`${this.url}order/stops/`)
  }
}
