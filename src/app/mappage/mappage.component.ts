import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'src/@theme/Services/map.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mappage',
  templateUrl: './mappage.component.html',
  styleUrls: ['./mappage.component.css'],
})
export class MappageComponent implements OnInit {
  lat: any;
  lng: any;
  Lat: any;
  Lng: any;
  area: any;
  autocomplete: any;
  locat;

  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyCrr-U8HBzd2cqmW9UpipocVTl9rHjCphY';
  storeInfo = [];
  formattedaddress = ' ';
  options = {
    type: [],
    componentRestrictions: {
      country: ['IN'],
    },
  };
  Location = {
    lat: 0,
    lng: 0,
  };
  constructor(
    private config: NgbRatingConfig,
    private mapService: MapService,
    private storeTokenService: StoreTokenService,
    private route: ActivatedRoute
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location not found');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.Location.lat = position.coords.latitude;
      this.Location.lng = position.coords.longitude;
      console.log(this.Location);
      if (!this.Location) {
      }
      if (this.Location.lat === undefined && this.Location.lng === undefined) {
        this.Lat = 22.572645;
        this.Lng = 88.363892;
      }
      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;

      this.mapService
        .getArea(this.Location.lat, this.Location.lng)
        .subscribe((data: any) => {
          this.area = data.results[0].formatted_address;
        });
    });
    const input = document.getElementById('pac-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {});
  }

  handleAddressChange(address: any) {
    console.log(address);

    this.mapService.getlatlong(address).subscribe((data: any) => {
      this.Location.lat = data.results[0].geometry.location.lat;
      this.Location.lng = data.results[0].geometry.location.lng;

      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;
    });

    this.storeInfo = JSON.parse(this.route.snapshot.paramMap.get('storeData'));
  }
}
