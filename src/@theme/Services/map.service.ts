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
  // AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY
  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  constructor(private httpClient: HttpClient) {}
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

  getDistanceInMile(source, destination) {
    return this.httpClient.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
        source +
        '&destinations=' +
        destination +
        '&key=' +
        this.Key
    );
  }
}
