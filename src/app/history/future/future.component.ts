import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OrdersService } from 'src/app/services/orders.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss'],
})
export class FutureComponent implements OnInit {
  @Input() elements: any;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(
    private ordersService: OrdersService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async cancel(id: string) {
    const alert = await this.alertController.create({
      header: 'Вы уверены?',
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Да',
          role: 'confirm',
          handler: () => {
            this.ordersService
              .deleteOrder(id)
              .subscribe((el) => this.newItemEvent.emit(true));
          },
        },
      ],
    });

    await alert.present();
  }
}
