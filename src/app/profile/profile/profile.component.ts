import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { ProfileService } from './../../services/profile.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  isError = false;
  isLogin = false;
  isRegistration = false;
  id = '';

  registerFirstName: string;
  registerLastName: string;
  registerPhoneNumber: string;
  registerPassword: string;

  loginPhoneNumber: string;
  loginPassword: string;

  constructor(
    private storageService: StorageService,
    private profileService: ProfileService,
    private tripsService: TripsService
  ) {}

  async ngOnInit() {
    const profile = await this.storageService.get('profile');
    if (profile) {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.phoneNumber = profile.phoneNumber;
      this.id = profile.id;
      this.tripsService.isLogin.next(true);
    } else {
      this.firstName = '';
      this.lastName = '';
      this.phoneNumber = '';
      this.tripsService.isLogin.next(false);
    }
  }

  async save() {
    if (
      this.firstName &&
      this.firstName.length > 2 &&
      this.firstName.length < 20 &&
      this.lastName &&
      this.lastName.length > 2 &&
      this.lastName.length < 20
    ) {
      this.profileService
        .update({
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
        })
        .subscribe(async (res: any) => {
          if (res.existingPassenger) {
            await this.storageService.set('profile', {
              firstName: res.existingPassenger.firstName,
              lastName: res.existingPassenger.lastName,
              phoneNumber: res.existingPassenger.phoneNumber,
              id: res.existingPassenger._id,
            });
            this.isError = false;
            (this.firstName = res.existingPassenger.firstName),
              (this.lastName = res.existingPassenger.lastName),
              (this.phoneNumber = res.existingPassenger.phoneNumber),
              alert('Обновлено');
          } else {
            this.isError = true;
          }
        });
    } else {
      this.isError = true;
    }
  }

  async logout() {
    await this.storageService.set('profile', {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      id: '',
    });
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.password = '';
    this.loginPassword = '';
    this.loginPhoneNumber = '';
    this.tripsService.isLogin.next(false);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength}`;
  }

  onLogin() {
    this.isLogin = true;
  }

  onRegister() {
    this.isRegistration = true;
  }

  onBack() {
    this.isRegistration = false;
    this.isLogin = false;
    this.registerFirstName = '';
    this.registerLastName = '';
    this.registerPassword = '';
    this.registerPhoneNumber = '';
    this.isError = false;
  }

  login() {
    const regEx = /^\+[0-9]{12}$/;
    if (
      this.loginPhoneNumber &&
      this.loginPassword &&
      this.loginPassword.length >= 6 &&
      this.loginPassword.length < 20 &&
      regEx.test(this.loginPhoneNumber)
    ) {
      this.profileService
        .logIn(this.loginPhoneNumber, this.loginPassword)
        .subscribe(async (res: any) => {
          if (!res.existingPassenger) {
            this.isError = true;
            return;
          }
          await this.storageService.set('profile', {
            firstName: res.existingPassenger.firstName,
            lastName: res.existingPassenger.lastName,
            phoneNumber: res.existingPassenger.phoneNumber,
            id: res.existingPassenger._id,
          });
          this.firstName = res.existingPassenger.firstName;
          this.lastName = res.existingPassenger.lastName;
          this.phoneNumber = res.existingPassenger.phoneNumber;
          this.loginPassword = '';
          this.loginPhoneNumber = '';
          this.isLogin = false;
          this.isError = false;
          this.tripsService.isLogin.next(true);
        });
    } else {
      this.isError = true;
    }
  }

  register() {
    const regEx = /^\+[0-9]{12}$/;
    if (
      this.registerPhoneNumber &&
      this.registerPassword &&
      this.registerPassword.length >= 6 &&
      this.registerPassword.length < 20 &&
      this.registerFirstName &&
      this.registerFirstName.length > 2 &&
      this.registerFirstName.length < 20 &&
      this.registerLastName &&
      this.registerLastName.length > 2 &&
      this.registerLastName.length < 20 &&
      regEx.test(this.registerPhoneNumber)
    ) {
      this.profileService
        .register({
          phoneNumber: this.registerPhoneNumber,
          password: this.registerPassword,
          firstName: this.registerFirstName,
          lastName: this.registerLastName,
        })
        .subscribe(async (res: any) => {
          if (!res.newPassenger) {
            this.isError = true;
            return;
          }
          await this.storageService.set('profile', {
            firstName: res.newPassenger.firstName,
            lastName: res.newPassenger.lastName,
            phoneNumber: res.newPassenger.phoneNumber,
            id: res.newPassenger._id,
          });
          this.firstName = res.newPassenger.firstName;
          this.lastName = res.newPassenger.lastName;
          this.phoneNumber = res.newPassenger.phoneNumber;
          this.registerFirstName = '';
          this.registerLastName = '';
          this.registerPassword = '';
          this.registerPhoneNumber = '';
          this.isRegistration = false;
          this.isError = false;
          this.tripsService.isLogin.next(true);
        });
    } else {
      this.isError = true;
    }
  }

  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
}
