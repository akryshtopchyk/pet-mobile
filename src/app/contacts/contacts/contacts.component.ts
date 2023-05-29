import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallComponent } from '../call/call.component';
import { PaymentsComponent } from '../payments/payments.component';
import { QuestionsComponent } from '../questions/questions.component';
import { RulesComponent } from '../rules/rules.component';
import { TermsComponent } from '../terms/terms.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  call = CallComponent;
  questions =QuestionsComponent;
  payments = PaymentsComponent;
  rules = RulesComponent;
  terms = TermsComponent;
  isSupported = false;

  constructor(private callNumber: CallNumber, private alertController: AlertController) { 
    this.callNumber.isCallSupported()
      .then(support => this.isSupported = support)
      .catch(err => this.isSupported = err);}

  ngOnInit() {
    this.callNumber.isCallSupported()
      .then(support => this.isSupported = support)
      .catch(err => this.isSupported = err);
  }

  async onCall() {
    await this.alertController.create({
      header: 'Alert',
      subHeader: 'qwe',
      message: `${this.callNumber}`,
      buttons: ['OK'],
    });
    this.callNumber.callNumber("+1234567890", true)
      .then(async res => {
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Important message',
          message: res + this.callNumber,
          buttons: ['OK'],
        });
    
        await alert.present();
      })
      .catch(async err => {
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Important message',
          message: err  + JSON.stringify(this.callNumber),
          buttons: ['OK'],
        });
    
        await alert.present();
      });
  }
}
