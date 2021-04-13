import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { StoreTokenService } from './store-token.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private adminheader = new HttpHeaders({
    Accept: 'application/json',
    'content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private token: StoreTokenService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.token.get('token');
    return !!token ? true : false;
  }

  public getAdminHeaders(): HttpHeaders {
    this.adminheader = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token'),
    });
    return this.adminheader;
  }

  getOrderlist() {
    return this.http.get(this.commonService.envUrl() + 'orderList', {
      headers: this.getAdminHeaders(),
    });
  }

  getUserDetail() {
    return this.http.get(this.commonService.envUrl() + 'user', {
      headers: this.getAdminHeaders(),
    });
  }

  changepassword(data) {
    return this.http.post(this.commonService.envUrl() + 'changePassword', data);
  }

  SubmitReview(data, id) {
    return this.http.post(
      this.commonService.envUrl() + 'store' + '/' + id + '/' + 'ratings',
      data,
      {
        headers: this.getAdminHeaders(),
      }
    );
  }

  getAlladdress() {
    return this.http.get(this.commonService.envUrl() + 'user/address', {
      headers: this.getAdminHeaders(),
    });
  }
  changeDetail(data) {
    return this.http.put(this.commonService.envUrl() + 'profile', data, {
      headers: this.getAdminHeaders(),
    });
  }

  addAddress(data) {
    return this.http.post(this.commonService.envUrl() + 'user/address', data, {
      headers: this.getAdminHeaders(),
    });
  }

  makedefault(id) {
    console.log(this.commonService.envUrl() + 'user/address/makedefault/' + id);
    return this.http.put(
      this.commonService.envUrl() + 'user/address/makedefault/' + id,
      {
        headers: this.getAdminHeaders(),
      }
    );
  }
}
