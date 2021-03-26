import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'src/@theme/Services/map.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/@theme/Services/header.service';

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
  shopmarker: object = {};
  autocomplete: any;
  location: any;
  Marker: any[] = [];
  searchshop: any[] = [];
  shop: any;
  Data: any[] = [];
  price: {} = {
    text: '$00',
    color: 'white',
    fontWeight: '500',
    fontSize: '20px',
  };

  icon: {
    url: 'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247';
    scaledSize: {
      width: 200;
      height: 150;
    };
  };
  styles = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#afa655',
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  url = 'https://maps.googleapis.com/maps/api/geocode/';
  Key = 'AIzaSyA_cl83OpGB8aR6uUnZgx8z12rUGztlel4';
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
    Icon: {},
  };
  constructor(
    private config: NgbRatingConfig,
    private mapService: MapService,
    private storeTokenService: StoreTokenService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
    this.storeInfo = JSON.parse(this.route.snapshot.paramMap.get('storeData'));
    if (!navigator.geolocation) {
      console.log('location not found');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.Location.lat = position.coords.latitude;
      this.Location.lng = position.coords.longitude;

      console.log(this.Location);

      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;

      console.log(this.Lat);
      console.log(this.Lng);
    });
    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    this.Lat = this.Location.lat;
    this.Lng = this.Location.lng;

    this.mapService
      .getArea(this.Location.lat, this.Location.lng)
      .subscribe((data: any) => {
        this.area = data.results[0].formatted_address;
        console.log(this.area);
      });
    const input = document.getElementById('pac-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {});

    this.Marker = JSON.parse(localStorage.getItem('shopmarker') || '[]');
    console.log(this.Marker);
  }

  handleAddressChange(address: any) {
    this.Marker.length = 0;
    console.log(address);
    this.area = address;

    this.mapService.getlatlong(this.area).subscribe((data: any) => {
      console.log(data);

      this.Location.lat = data.results[0].geometry.location.lat;
      this.Location.lng = data.results[0].geometry.location.lng;
      console.log(this.Location);

      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;
    });

    this.searchshop.length = 0;
    this.searchshop.push(
      JSON.parse(localStorage.getItem('deviceProblem') || '[]')
    );

    this.searchshop[0].latitude = this.Lat;
    this.searchshop[0].longitude = this.Lng;

    console.log(this.searchshop);
    localStorage.setItem('deviceProblem', JSON.stringify(this.searchshop[0]));

    this.headerService.searchStore(this.searchshop[0]).subscribe(
      (data) => {
        console.log(data);
        this.Data.push(data);
        for (var i = 0; i < this.Data.length; i++) {
          for (var j = 0; j < this.Data[i].data.length; j++) {
            this.shopmarker = {
              latitude: this.Data[i].data[j].latitude,
              longitude: this.Data[i].data[j].longitude,
              icon: {
                url:
                  'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e',
                scaledSize: {
                  width: 100,
                  height: 70,
                },
              },
              Price: this.price,
            };

            this.Marker.push(this.shopmarker);
          }
        }

        localStorage.setItem('shopmarker', JSON.stringify(this.Marker));

        console.log(this.Marker);

        this.router.navigate([
          '/map',
          { storeData: JSON.stringify(data['data']) },
        ]);
      },
      (error) => {}
    );

    this.storeInfo = JSON.parse(this.route.snapshot.paramMap.get('storeData'));
  }

  shopDetail(id, shop) {
    console.log(shop);
    localStorage.removeItem('Shop');
    localStorage.setItem('Shop', JSON.stringify(shop));
    console.log(id);
    let shopDetail = {
      id: id,
      distance: null,
    };
    this.storeInfo.forEach((element) => {
      if (element.id == id) {
        shopDetail.distance = element.distance;
      }
    });
    this.router.navigate(['/shop', { id: JSON.stringify(shopDetail) }]);
  }
}
