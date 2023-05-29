import { Component, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';
import { OrdersService } from './../../services/orders.service';
import { StorageService } from './../../services/storage.service';
import { TripsService } from './../../services/trips.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  date: any;
  peopleCount: number;
  placeFrom: any;
  placeTo: any;
  sum: number;
  isSelectOpen = false;
  paymentMethod = 1;
  trip: any;
  start: string;
  end: string;
  isSelectSeatOpen = false;
  comment: string;

  constructor(
    private tripsService: TripsService,
    private ordersService: OrdersService,
    private storageService: StorageService,
    private nav: IonNav
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.date = this.tripsService.date;
      this.peopleCount = this.tripsService.peopleCount;
      this.placeFrom = this.tripsService.placeFrom;
      this.placeTo = this.tripsService.placeTo;
      this.sum = this.tripsService.sum;
      this.trip = this.tripsService.trip;
      this.start = this.getTime(this.trip.fixedStartTime, this.placeFrom.time)
      this.end = this.getTime(this.trip.fixedEndTime, -this.placeTo.time)
    });
  }

  async onClick() {
    const profile = await this.storageService.get('profile');
    this.ordersService.createOrder({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      description: `мобильное приложение, оплата: ${this.paymentMethod === 1 ? 'Наличными' : 'Картой'}, комментарий: ${this.comment}`,
      tripId: this.trip.id,
      fromStop: this.placeFrom.name,
      fromStopTime: this.placeFrom.time.toString(),
      toStop: this.placeTo.name,
      toStopTime: this.placeTo.time.toString(),
      seatCount: this.peopleCount,
    }).subscribe(async (res: any) => {
      if(res.newOrder) {
        alert('забронировано')
        this.nav.popToRoot();
      } else {
        alert('Что то пошло не так')
        this.nav.popToRoot();
      }
    });
  }

  setPaymentMethod(paymentMethod: number) {
    this.paymentMethod = paymentMethod;
    this.isSelectOpen = !this.isSelectOpen;
  }

  onSelectToggle() {
    this.isSelectOpen = !this.isSelectOpen;
  }

  onSelectSeatToggle() {
    this.isSelectSeatOpen = !this.isSelectSeatOpen;
  }

  getDateFormat() {
    if (this.date) {
      return `${this.date.getDate()} ${this.getMonth(this.date.getMonth())}`;
    }
    return false;
  }

  getTime(time: string, plus: number): string {
    const startH: number = +time.split(':')[0] * 60;
    const startM = +time.split(':')[1];
    const resultH = Math.trunc((startH + startM + plus) / 60);
    const resultM = startH + startM + plus - resultH * 60;
    return `${resultH < 10 ? '0' + resultH : resultH}:${
      resultM < 10 ? '0' + resultM : resultM
    }`;
  }

  private getMonth(monthNumber: number) {
    if (monthNumber === 0) {
      return 'Января';
    }
    if (monthNumber === 1) {
      return 'Февраля';
    }
    if (monthNumber === 2) {
      return 'Марта';
    }
    if (monthNumber === 3) {
      return 'Апреля';
    }
    if (monthNumber === 4) {
      return 'Мая';
    }
    if (monthNumber === 5) {
      return 'Июня';
    }
    if (monthNumber === 6) {
      return 'Июля';
    }
    if (monthNumber === 7) {
      return 'Августа';
    }
    if (monthNumber === 8) {
      return 'Сентября';
    }
    if (monthNumber === 9) {
      return 'Октября';
    }
    if (monthNumber === 10) {
      return 'Ноября';
    }
    if (monthNumber === 11) {
      return 'Декабря';
    }
    return 'Декабря';
  }
}
