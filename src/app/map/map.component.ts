import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  title = 'My first AGM project';
  lat: any;
  lng: any;
  // 21.158u8329
  // 72.7688111
  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  constrctor(config: NgbRatingConfig, private http: HttpClient) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location not found');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.lat, this.lng);
      // this.getarea();
    });
  }

  getarea() {
    // this.http
    //   .get(`${this.url}json?latlng=${this.lat},${this.lng}&key=${this.Key}`)
    //   .subscribe((data: any) => {});
  }

  // watchPosition() {
  //   navigator.geolocation.watchPosition(
  //     (position) => {
  //       console.log(
  //         `lat: ${position.coords.latitude}, log: ${position.coords.longitude}`
  //       );
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 0,
  //     }
  //   );
  // }
}
