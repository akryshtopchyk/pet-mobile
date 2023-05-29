import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  update(newProfileDate: any) {
    return this.http.put(`${this.url}passenger/${newProfileDate.id}`, newProfileDate);
  }

  getProfileData(phoneNumber: string) {
    return this.http.get(`${this.url}passenger/${phoneNumber}`);
  }

  logIn(phoneNumber: string, password: string) {
    return this.http.post(`${this.url}passenger/login`, {
      phoneNumber: phoneNumber,
      password: password,
    });
  }

  register(profileDate: any) {
    return this.http.post(`${this.url}passenger/register`, {
      phoneNumber: profileDate.phoneNumber,
      password: profileDate.password,
      firstName: profileDate.firstName,
      lastName: profileDate.lastName,
    });
  }
}
