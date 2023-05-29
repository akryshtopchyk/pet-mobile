import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  segmentValue = 'future';
  obs: any;

  orders: any = { future: [], archive: [] };

  constructor(private ordersService: OrdersService) {}

  async ngOnInit() {
    const orders = await this.ordersService.getOrders();
    this.obs = orders.subscribe((orders: any) => {
      this.setData(orders.tripData)
    });
  }

  getTime(start: string, plus: number) {
    const startH: number = +start.split(':')[0] * 60;
    const startM = +start.split(':')[1];
    const resultH = Math.trunc((startH + startM + plus) / 60);
    const resultM = startH + startM + plus - resultH * 60;
    return `${resultH < 10 ? '0' + resultH : resultH}:${
      resultM < 10 ? '0' + resultM : resultM
    }`;
  }

  segmentChanged(e: any) {
    this.segmentValue = e.detail.value;
  }

  async onRefresh() {
    this.obs.unsubscribe();
    this.orders = { future: [], archive: [] };
    const orders = await this.ordersService.getOrders();
    this.obs = orders.subscribe((orders: any) => {
      this.setData(orders.tripData);
    });
  }

  async refresh(isRefresh: boolean) {
    if (isRefresh) {
      this.obs.unsubscribe();
      this.orders = { future: [], archive: [] };
      const orders = await this.ordersService.getOrders();
      this.obs = orders.subscribe((orders: any) => {
        this.setData(orders.tripData);
      });
    }
  }

  setData(orders: any) {
    if (orders && orders.length) {
      orders.forEach((el: any) => {
        if (new Date(el.date) > this.getDate() || (new Date(el.date) === this.getDate() && this.checkTime(el.departureTime))) {
          this.orders.future.push({
            id: el.order[0]._id,
            from: el.from === 'minsk' ? 'Минск' : 'Иваново',
            to: el.from === 'minsk' ? 'Иваново' : 'Минск',
            startTime: this.getTime(el.departureTime, +el.order[0].fromStopTime),
            endTime: this.getTime(
              el.arrivalTime,
              +el.order[0].toStopTime * -1
            ),
            startStop: el.order[0].fromStop,
            endStop: el.order[0].toStop,
            date: `${
              new Date(el.date).getDate() > 9
                ? new Date(el.date).getDate()
                : '0' + new Date(el.date).getDate()
            }.${
              new Date(el.date).getMonth() + 1 > 9
                ? new Date(el.date).getMonth() + 1
                : '0' + (new Date(el.date).getMonth() + 1)
            }.${new Date(el.date).getFullYear()}`,
            sum: el.sum * el.order[0].seatCount,
            place: el.order[0].seatCount,
          });
        } else {
          this.orders.archive.push({
            id: el.order[0]._id,
            from: el.from === 'minsk' ? 'Минск' : 'Иваново',
            to: el.from === 'minsk' ? 'Иваново' : 'Минск',
            startTime: this.getTime(el.departureTime, +el.order[0].fromStopTime),
            endTime: this.getTime(
              el.arrivalTime,
              +el.order[0].toStopTime * -1
            ),
            startStop: el.order[0].fromStop,
            endStop: el.order[0].toStop,
            date: `${
              new Date(el.date).getDate() > 9
                ? new Date(el.date).getDate()
                : '0' + new Date(el.date).getDate()
            }.${
              new Date(el.date).getMonth() + 1 > 9
              ? new Date(el.date).getMonth() + 1
              : '0' + (new Date(el.date).getMonth() + 1)
            }.${new Date(el.date).getFullYear()}`,
            sum: el.sum * el.order[0].seatCount,
            place: el.order[0].seatCount,
          });
        }
      });
    }
  }

  getDate() {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    )
  }

  checkTime(time: string): boolean {
    const timeH: number = +time.split(':')[0] * 60;
    const timeM = +time.split(':')[1];
    return timeH + timeM > new Date().getHours() * 60 + new Date().getMinutes();
  }
}
