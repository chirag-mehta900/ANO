import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

lat:any 
log:any
  constructor() { }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location not found');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.log = position.coords.longitude;
      console.log(this.lat,this.log);
    });
  }
  watchPosition() {
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, log: ${position.coords.longitude}`
        );
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
  }


