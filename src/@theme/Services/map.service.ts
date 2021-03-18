import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  logIn(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + 'login', data);
  }
  getUserName() {
    return this.httpClient.get(this.commonService.envUrl() + 'user');
  }

  getArea(Lat, Lng) {
    return this.httpClient.get(
      this.url + 'json?latlng=' + Lat + ',' + Lng + '&key=' + this.Key
    );
  }
}
