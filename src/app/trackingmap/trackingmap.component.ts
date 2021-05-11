import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'src/@theme/Services/map.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-trackingmap',
  templateUrl: './trackingmap.component.html',
  styleUrls: ['./trackingmap.component.css'],
})
export class TrackingmapComponent implements OnInit {
  lat: any;
  lng: any;
  Lat: any;
  Lng: any;
  area: any;
  shopDetail;
  order;
  device: any[] = [];

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
  trackId: any;
  Location = {
    lat: 0,
    lng: 0,
  };

  styles: any[] = [];
  totaldevice: number = 0;

  constructor(
    private config: NgbRatingConfig,
    private mapService: MapService,
    private storeTokenService: StoreTokenService,
    private route: ActivatedRoute,
    private profile: ProfileService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('Id');

    this.trackorderApi(this.trackId);

    this.styles = this.mapService.getMapStyle();

    if (!navigator.geolocation) {
      console.log('location not found');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.Location.lat = position.coords.latitude;
      this.Location.lng = position.coords.longitude;
      console.log(this.Location);
      if (!this.Location) {
        console.log('hello');
      }
      if (this.Location.lat === undefined && this.Location.lng === undefined) {
        console.log('hello');
        this.Lat = 22.572645;
        this.Lng = 88.363892;
      }
      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;
      console.log(this.Location);

      this.mapService.getArea(this.Location.lat, this.Location.lng).subscribe(
        (data: any) => {
          this.area = data.results[0].formatted_address;
          console.log(data);
          console.log(this.area);
        },
        (error) => {
          console.log(error);
        }
      );
    });
    const input = document.getElementById('pac-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {});
  }

  trackorderApi(id) {
    this.profile.trackservice(id).subscribe(
      (data) => {
        if (data['status'] == 200) {
          this.shopDetail = data['data']['order'].shop;

          this.order = data['data']['order'];
          this.device = data['data']['order'].details;
          this.totaldevice = data['data']['order']['details'].length;
          console.log(this.totaldevice);

          console.log(this.order);
          console.log(this.shopDetail);

          console.log(this.device);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleAddressChange(address: any) {
    console.log(address);

    this.mapService.getlatlong(address).subscribe(
      (data: any) => {
        this.Location.lat = data.results[0].geometry.location.lat;
        this.Location.lng = data.results[0].geometry.location.lng;
        console.log(data);
        console.log(this.Location);

        localStorage.setItem('Location', JSON.stringify(this.Location));
        this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

        this.Lat = this.Location.lat;
        this.Lng = this.Location.lng;
      },
      (error) => {
        console.log(error);
      }
    );

    this.storeInfo = JSON.parse(this.route.snapshot.paramMap.get('storeData'));
  }
}
