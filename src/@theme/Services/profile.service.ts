import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { StoreTokenService } from './store-token.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private token: StoreTokenService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.token.get('token');
    return !!token ? true : false;
  }

  getOrderlist() {
    return this.http.get(this.commonService.envUrl() + 'orderList');
  }
}
