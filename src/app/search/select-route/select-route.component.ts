import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../services/storage.service';
import { TripsService } from './../../services/trips.service';
import { StopsComponent } from '../stops/stops.component';

type Stop = {
  id: number;
  name: string;
  type: string;
};

@Component({
  selector: 'app-select-route',
  templateUrl: './select-route.component.html',
  styleUrls: ['./select-route.component.scss'],
})
export class SelectRouteComponent implements OnInit {
  stops = StopsComponent;
  cityList: Array<Stop> = [
    {
      id: 1,
      name: 'Минск',
      type: 'minsk',
    },
    {
      id: 2,
      name: 'Иваново',
      type: 'ivanovo',
    },
  ];
  currentCity = this.cityList[0];
  cityTo = this.cityList[1];
  isCalendarOpen = false;
  peopleCount = 1;

  availableDatesMI: Array<Date> = [];
  availableDatesIM: Array<Date> = [];
  availableDates: Array<Date> = [];
  date: Date;
  trips: Array<Object> = [];

  constructor(private tripsService: TripsService, private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    this.tripsService.getRoutes().subscribe((routes: any) => {
      routes.tripData.forEach((trip: any) => {
        if (this.checkDate(trip.date, false) || (this.checkDate(trip.date, true) && this.checkTime(trip.departureTime))) {
          const date = new Date(trip.date);
          if (trip.from === 'minsk') {
            this.availableDatesMI.push(date);
          }
          if (trip.from === 'ivanovo') {
            this.availableDatesIM.push(date);
          }
        }
      });
      if (this.currentCity.id === 1) {
        this.availableDates = this.availableDatesMI;
      } else {
        this.availableDates = this.availableDatesIM;
      }
      this.date = this.availableDates[0];
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

  checkTime(time: string): boolean {
    const timeH: number = +time.split(':')[0] * 60;
    const timeM = +time.split(':')[1];
    console.log(timeH + timeM, new Date().getHours() * 60 + new Date().getMinutes())
    return timeH + timeM > new Date().getHours() * 60 + new Date().getMinutes();
  }

  handleChange(ev: any) {
    this.currentCity = ev.target.value;
    if (this.currentCity.id === 1) {
      this.availableDates = this.availableDatesMI;
      this.cityTo = this.cityList[1]
    } else {
      this.availableDates = this.availableDatesIM;
      this.cityTo = this.cityList[0]
    }
    this.date = this.availableDates[0];
  }

  onSwapClick() {
    this.currentCity =
      this.currentCity.id === 1 ? this.cityList[1] : this.cityList[0];
    this.cityTo =
      this.currentCity.id === 1 ? this.cityList[0] : this.cityList[1];
    if (this.currentCity.id === 1) {
      this.availableDates = this.availableDatesMI;
    } else {
      this.availableDates = this.availableDatesIM;
    }
    this.date = this.availableDates[0];
  }

  onCalendarToggle() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  onCalendarChange(ev: any) {
    this.date = new Date(ev.target.value);
    this.isCalendarOpen = false;
  }

  isDateEnabled = (dateString: string) => {
    const date = new Date(dateString);
    if (
      this.availableDates.find(
        (el) =>
          el.getDate() === date.getDate() &&
          el.getMonth() === date.getMonth() &&
          el.getFullYear() === date.getFullYear()
      )
    ) {
      return true;
    }
    return false;
  };

  minusPeople() {
    if (this.peopleCount > 1) {
      this.peopleCount -= 1;
    }
  }

  plusPeople() {
    if (this.peopleCount < 3) {
      this.peopleCount += 1;
    }
  }

  onNavClick() {
    this.tripsService.date = this.date;
    this.tripsService.peopleCount = this.peopleCount;
    this.tripsService.currentCity = this.currentCity;
    this.tripsService.cityTo = this.cityTo;
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
