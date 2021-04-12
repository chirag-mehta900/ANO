import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  });

  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}
  getArea(Lat, Lng) {
    console.log(
      this.url + 'json?latlng=' + Lat + ',' + Lng + '&key=' + this.Key
    );
    return this.httpClient.get(
      this.url + 'json?latlng=' + Lat + ',' + Lng + '&key=' + this.Key
    );
  }

  getlatlong(address) {
    return this.httpClient.get(
      this.url + 'json?address=' + address + '&key=' + this.Key
    );
  }

  getDistanceInMile(data) {
    return this.httpClient.post(this.commonService.envUrl() + 'calculate/distance', data);
  }
}
