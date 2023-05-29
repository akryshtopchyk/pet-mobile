import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { OrdersService } from '../..//services/orders.service';
import { TripsService } from '../../services/trips.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Router } from '@angular/router';

type Trip = {
  id: number;
  startTime: string;
  fixedStartTime: string;
  endTime: string;
  fixedEndTime: string;
  freePlace: number;
  sum: number;
};

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss'],
})
export class StopsComponent implements OnInit {
  confirmComponent = ConfirmComponent;
  isSelectMinskStop = false;
  isSelectIvanovoStop = false;
  date: any;
  currentCity = {
    id: 0,
    name: '',
    type: '',
  };
  peopleCount: any;
  cityTo = {
    id: 0,
    name: '',
  };
  placeCount = '3+';
  trips: Array<Trip> = [];
  placesMinsk: any = [];
  placesIvanovo: any = [];
  placeFrom: any = { name: '' };
  placeTo: any = { name: '' };
  id = false;

  constructor(
    private tripsService: TripsService,
    private ordersService: OrdersService,
    private router: Router,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const profile = await this.storageService.get('profile');
    setTimeout(() => {
      this.tripsService.isLogin.subscribe(
        isLogin => this.id = isLogin
      )
      this.date = this.tripsService.date;
      this.currentCity = this.tripsService.currentCity;
      this.peopleCount = this.tripsService.peopleCount;
      this.cityTo = this.tripsService.cityTo;
      this.tripsService
        .getTripsByDate(this.date, this.currentCity.type)
        .subscribe((trips: any) => {
          trips.tripData.forEach((trip: any) => {
            if (this.checkDate(trip.date, false) || (this.checkDate(trip.date, true) && this.checkTime(trip.departureTime))) {
              this.trips.push({
                id: trip._id,
                startTime: trip.departureTime,
                fixedStartTime: trip.departureTime,
                endTime: trip.arrivalTime,
                fixedEndTime: trip.arrivalTime,
                freePlace: trip.seatCount - trip.orders,
                sum: trip.sum,
              });
            }
          });
          this.trips.sort(
            (a: any, b: any) =>
              this.getMinutes(a.fixedStartTime) -
              this.getMinutes(b.fixedStartTime)
          );
        });
        this.id = !!profile.id;
    });

    this.ordersService.getStops().subscribe((stops: any) => {
      this.placesIvanovo = stops.orderData.im;
      this.placesMinsk = stops.orderData.mi;
      if (this.cityTo.id === 1) {
        this.placeFrom = this.placesIvanovo[0];
        this.placeTo = this.placesMinsk[0];
      } else {
        this.placeFrom = this.placesMinsk[0];
        this.placeTo = this.placesIvanovo[0];
      }
    });
  }

  checkDate(tripDate: any, eq: boolean) {
    if (eq) {
      return new Date(
        new Date(tripDate).getFullYear(),
        new Date(tripDate).getMonth(),
        new Date(tripDate).getDate(),
      ).getTime() === new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ).getTime()
    } else {
      return new Date(
        new Date(tripDate).getFullYear(),
        new Date(tripDate).getMonth(),
        new Date(tripDate).getDate(),
      ).getTime() > new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ).getTime()
    }
  }

  getMinutes(time: string): number {
    const startH: number = +time.split(':')[0] * 60;
    const startM = +time.split(':')[1];
    return startH + startM;
  }

  onSelectStopToggle(isFrom: boolean) {
    if (isFrom) {
      this.currentCity.id === 1
        ? (this.isSelectMinskStop = !this.isSelectMinskStop)
        : (this.isSelectIvanovoStop = !this.isSelectIvanovoStop);
    } else {
      this.currentCity.id === 1
        ? (this.isSelectIvanovoStop = !this.isSelectIvanovoStop)
        : (this.isSelectMinskStop = !this.isSelectMinskStop);
    }
  }

  closeMinsk() {
    this.isSelectMinskStop = !this.isSelectMinskStop;
  }

  closeIvanovo() {
    this.isSelectIvanovoStop = !this.isSelectIvanovoStop;
  }

  setStop(stop: any, id: number) {
    if (id === 1 && this.cityTo.id === 1) {
      this.placeTo = stop;
      this.isSelectMinskStop = !this.isSelectMinskStop;
      this.trips = this.trips.map((el: any) => {
        return { ...el, endTime: this.getNewTime(el.fixedEndTime, -stop.time) };
      });
    }
    if (id === 2 && this.cityTo.id === 2) {
      this.placeTo = stop;
      this.isSelectIvanovoStop = !this.isSelectIvanovoStop;
      this.trips = this.trips.map((el: any) => {
        return { ...el, endTime: this.getNewTime(el.fixedEndTime, -stop.time) };
      });
    }
    if (id === 1 && this.currentCity.id === 1) {
      this.placeFrom = stop;
      this.isSelectMinskStop = !this.isSelectMinskStop;
      this.trips = this.trips.map((el: any) => {
        return {
          ...el,
          startTime: this.getNewTime(el.fixedStartTime, stop.time),
        };
      });
    }
    if (id === 2 && this.currentCity.id === 2) {
      this.placeFrom = stop;
      this.isSelectIvanovoStop = !this.isSelectIvanovoStop;
      this.trips = this.trips.map((el: any) => {
        return {
          ...el,
          startTime: this.getNewTime(el.fixedStartTime, stop.time),
        };
      });
    }
  }

  checkTime(time: string): boolean {
    const timeH: number = +time.split(':')[0] * 60;
    const timeM = +time.split(':')[1];
    return timeH + timeM > new Date().getHours() * 60 + new Date().getMinutes();
  }

  getNewTime(time: string, plus: number): string {
    const startH: number = +time.split(':')[0] * 60;
    const startM = +time.split(':')[1];
    const resultH = Math.trunc((startH + startM + plus) / 60);
    const resultM = startH + startM + plus - resultH * 60;
    return `${resultH < 10 ? '0' + resultH : resultH}:${
      resultM < 10 ? '0' + resultM : resultM
    }`;
  }

  async onNavClick(trip: any) {
    this.tripsService.placeFrom = this.placeFrom;
    this.tripsService.placeTo = this.placeTo;
    this.tripsService.sum = trip.sum;
    this.tripsService.trip = trip;
  }

  async onWithoutAccountNavClick(trip: any) {
    this.router.navigate(['./tabs/profile']);
  }

  getDateFormat() {
    if (this.date) {
      return `${this.date.getDate()} ${this.getMonth(this.date.getMonth())}`;
    }
    return false;
  }

  private getMonth(monthNumber: number) {
    if (monthNumber === 0) {
      return 'Января';
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
