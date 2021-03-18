import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  title = 'My first AGM project';
  lat = 21.1588329;
  lng = 72.7688111;

  constructor(config: NgbRatingConfig) {
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
      console.log(this.lat,this.lng);
    });
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
