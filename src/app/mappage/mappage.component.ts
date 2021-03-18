import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'src/@theme/Services/map.service';

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.css'],
})
export class MappageComponent implements OnInit {
  lat: any;
  lng: any;
  area: any;
  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  constructor(private config: NgbRatingConfig, private mapService: MapService) {
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
      // this.mapService.getArea(this.lat, this.lng).subscribe((data: any) => {
      //   this.area = data.plus_code.compound_code;
      //   this.area = this.area.split(' ').slice(1).join(' ');
      //   console.log(this.area);
      // });
      this.lat = 15.496777;
      this.lng = 73.827827;
      this.mapService.getArea(this.lat, this.lng).subscribe((data: any) => {
        this.area = data.plus_code.compound_code;
        console.log(data);
        this.area = this.area.split(' ').slice(1).join(' ');
        console.log(this.area);
      });
    });
  }
}
