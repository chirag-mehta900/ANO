import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from 'src/@theme/Services/map.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/@theme/Services/header.service';
import { BookRepairComponent } from '../header-module/book-repair/book-repair.component';
import { ShopService } from 'src/@theme/Services/shop.service';

type ResponseType = {
  data: [
    {
      pricing: [];
    }
  ];
};

@Component({
  selector: 'app-get-all-shop',
  templateUrl: './get-all-shop.component.html',
  styleUrls: ['./get-all-shop.component.css'],
})
export class GetAllShopComponent implements OnInit {
  newShop: any[] = [];
  lat: any;
  lng: any;
  Lat: any;
  Lng: any;
  area: any;
  Configs: any[] = [];
  prolist: any[] = [];
  issues: any[] = [];
  devicelist: any[] = [];

  shopmarker: object = {};
  autocomplete: any;
  display = [
    {
      Device: null,
      problem: null,
    },
  ];
  location: any;
  Marker: any[] = [];
  searchshop = {
    problem: '',
    longitude: '',
    latitude: '',
    distanceMile: 10,
    device: '',
  };
  shop: any;
  Data: any[] = [];
  Shoplist: any[] = [];

  price: {} = {
    text: '',
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
    Icon: {
      url:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      scaledSize: {
        width: 200,
        height: 100,
      },
    },
  };
  filterFlag: boolean = false;
  formSubmitted: boolean = false;

  deviceList: any[] = [];
  issueList: any[] = [];
  brandList: [];
  bookRepair = {
    device: null,
    problem: null,
    latitude: null,
    longitude: null,
    distanceMile: 10,
  };
  filterData = {
    device_id: null,
    problem_id: null,
  };

  rating3 = 3;

  constructor(
    private config: NgbRatingConfig,
    private mapService: MapService,
    private storeTokenService: StoreTokenService,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private Shop: ShopService
  ) {
    config.max = 5;
    config.readonly = true;
    this.getBrandList();
  }

  ngOnInit() {
    // this.searchshop = JSON.parse(localStorage.getItem('deviceProblem') || '[]');
    // console.log(this.searchshop);

    localStorage.setItem('Location', JSON.stringify(this.Location));

    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    if (this.Location.lat == 0 && this.Location.lng == 0) {
      this.Location.lat = 33.448376;
      this.Location.lng = -112.074036;

      this.lat = this.Location.lat;
      this.lng = this.Location.lng;
    }

    localStorage.setItem('Location', JSON.stringify(this.Location));
    this.Lat = this.Location.lat;
    this.Lng = this.Location.lng;
    console.log('hello', this.Location);

    this.shoplist(this.Location);

    this.Configs = JSON.parse(localStorage.getItem('deviceProblem') || '[]');
    console.log(this.Configs['device']);
    console.log(this.Configs['problem']);

    this.prolist = JSON.parse(localStorage.getItem('issues') || '[]');
    console.log(this.prolist);

    this.devicelist = JSON.parse(localStorage.getItem('deviceList') || '[]');
    console.log(this.devicelist[this.Configs['device']]);

    this.display[0].Device = this.devicelist[
      this.Configs['device'] - 1
    ].full_name;

    for (var i = 0; i < this.prolist.length; i++) {
      if (this.prolist[i].problemId == this.Configs['problem']) {
        console.log(this.prolist[i]);
        this.display[0].problem = this.prolist[i].problem;
      }
    }

    // this.deviceList.forEach((e) => {
    //   console.log(e);

    //   console.log(e.id);
    //   console.log(this.Configs['device']);
    //   console.log(e.full_name);

    //   if (e.id == this.Configs['device']) {
    //     this.display.Device = e.full_name;
    //   }
    // });

    // this.prolist.forEach((e) => {
    //   if (e.id == this.Configs['problem']) {
    //     console.log(e);
    //   }
    // });

    console.log(this.display);

    this.Marker = JSON.parse(localStorage.getItem('shopmarker') || '[]');
    console.log(this.Marker);

    this.Shoplist = JSON.parse(localStorage.getItem('Shoplist') || '[]');
    console.log(this.Shoplist);

    this.storeInfo = JSON.parse(this.route.snapshot.paramMap.get('storeData'));
    if (!navigator.geolocation) {
      console.log('location not found');
    }

    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.Location.lat = position.coords.latitude;
    //   this.Location.lng = position.coords.longitude;

    //   console.log(this.Location);

    //   localStorage.setItem('Location', JSON.stringify(this.Location));
    //   this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    //   this.Lat = this.Location.lat;
    //   this.Lng = this.Location.lng;

    // });

    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    this.Lat = this.Location.lat;
    this.Lng = this.Location.lng;
    var Icon = this.Location.Icon;
    console.log('hello', this.Location);

    this.mapService
      .getArea(this.Location.lat, this.Location.lng)
      .subscribe((data: any) => {
        this.area = data.results[0].formatted_address;
        localStorage.setItem('Address', JSON.stringify(this.area));

        console.log(this.area);
      });
    const input = document.getElementById('pac-input') as HTMLInputElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {});
  }

  shoplist(latlong) {
    var obj = {
      latitude: latlong.lat,
      longitude: latlong.lng,
      distanceMile: 20,
    };

    this.Shop.getallstore(obj).subscribe((data) => {
      console.log(data);

      this.newShop = data['data'].shop;
      console.log(this.newShop, 'New Shop');
      this.Marker.length = 0;
      for (var i = 0; i < this.newShop.length; i++) {
        this.shopmarker = {
          latitude: this.newShop[i].latitude,
          longitude: this.newShop[i].longitude,
          icon: {
            url:
              'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/MicrosoftTeams-image%20(8).png?alt=media&token=6daea4dc-bc59-425f-8862-c2c407b6939a',
            scaledSize: {
              width: 70,
              height: 80,
            },
          },
        };
        this.Marker.push(this.shopmarker);
      }
      localStorage.removeItem('shopmarker');

      console.log(this.Marker);
      localStorage.setItem('shopmarker', JSON.stringify(this.Marker));
    });
  }
  async handleAddressChange(address: any) {
    this.searchshop = JSON.parse(localStorage.getItem('deviceProblem') || '[]');
    console.log(this.searchshop);
    this.Marker.length = 0;
    console.log(address);
    this.area = address;
    localStorage.removeItem('Address');
    localStorage.setItem('Address', JSON.stringify(this.area));

    await this.mapService.getlatlong(this.area).subscribe((data: any) => {
      console.log(data);

      this.Location.lat = data.results[0].geometry.location.lat;
      this.Location.lng = data.results[0].geometry.location.lng;
      console.log(this.Location);

      localStorage.setItem('Location', JSON.stringify(this.Location));
      console.log(this.Location.lng);

      this.Lat = this.Location.lat;
      this.Lng = this.Location.lng;

      this.searchshop.latitude = data.results[0].geometry.location.lat;
      this.searchshop.longitude = data.results[0].geometry.location.lng;

      // let inter = setInterval(() => {
      //   this.searchshop[0].latitude = this.Location.lat;
      //   this.searchshop[0].longitude = this.Location.lng;

      //   if (this.searchshop[0].latitude != undefined) {
      //     clearInterval(inter);
      //   }
      // }, 10);

      console.log(this.searchshop);
      localStorage.setItem('deviceProblem', JSON.stringify(this.searchshop));

      this.shoplist(this.Location);
      // this.headerService.searchStore(this.searchshop).subscribe(
      //   (response: ResponseType) => {
      //     console.log(response);
      //     this.Data.length = 0;
      //     response.data.forEach((e) => {
      //       if (e.pricing.length) {
      //         this.Data.push(e);
      //       }
      //     });
      //     console.log(this.Data);

      //     localStorage.removeItem('Shoplist');
      //     localStorage.setItem('Shoplist', JSON.stringify(this.Data));

      //     this.Shoplist = JSON.parse(localStorage.getItem('Shoplist') || '[]');

      //     for (var i = 0; i < this.Data.length; i++) {
      //       this.shopmarker = {
      //         latitude: this.Data[i].latitude,
      //         longitude: this.Data[i].longitude,
      //         price: {
      //           text: this.Data[i].pricing[0].price.toString(),
      //           color: 'white',
      //           fontWeight: '500',
      //           fontSize: '20px',
      //         },
      //         icon: {
      //           url:
      //             'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      //           scaledSize: {
      //             width: 100,
      //             height: 70,
      //           },
      //         },
      //       };
      //       this.Marker.push(this.shopmarker);
      //     }

      //     console.log(this.Marker);

      //     console.log(this.searchshop);
      //     localStorage.setItem('shopmarker', JSON.stringify(this.Marker));

      //     console.log(this.Marker);

      //     this.router.navigate([
      //       '/map',
      //       { storeData: JSON.stringify(response['data']) },
      //     ]);
      //   },
      //   (error) => {}
      // );

      this.storeInfo = JSON.parse(
        this.route.snapshot.paramMap.get('storeData')
      );
    });
  }

  shopDetail(id, shop) {
    console.log(shop);
    localStorage.removeItem('Shop');
    localStorage.setItem('Shop', JSON.stringify(shop));
    console.log(id);
    let shopDetail = {
      id: id,
      distance: shop.distance,
    };
    // this.storeInfo.forEach((element) => {
    //   if (element.id == id) {
    //     shopDetail.distance = element.distance;
    //   }
    // });
    this.router.navigate(['/shop', { id: JSON.stringify(shopDetail) }]);
  }
  getBrandList() {
    if (this.deviceList.length == 0) {
      this.headerService.getBrandList().subscribe(
        (data) => {
          console.log(data);

          this.deviceList = data['data'];
          console.log(this.deviceList);
          localStorage.setItem('deviceList', JSON.stringify(this.deviceList));
        },
        (error) => {}
      );
    }
  }

  // getDeviceList(event) {
  //   this.headerService.getDeviceList(event.target.value).subscribe(
  //     (data) => {
  //       this.deviceList = data['data'];
  //     },
  //     (error) => {}
  //   );
  // }

  getIssueList(event) {
    let obj = {
      device_id: event.target.value,
    };
    console.log(obj);
    this.headerService.getIssueListById(obj).subscribe(
      (data) => {
        console.log(data);

        this.issueList = data['data'];
      },
      (error) => {}
    );
  }
  filter() {
    // this.filterFlag = true;

    this.modalService.open(BookRepairComponent);
  }
  applyFilter(Repair) {
    console.log(Repair);

    this.filterFlag = false;

    localStorage.removeItem('issues');
    console.log(this.bookRepair);
    this.issueList.forEach((e) => {
      var obj = {
        problemId: e.problem.id,
        problem: e.problem.problemName,
      };
      this.issues.push(obj);
    });
    localStorage.setItem('issues', JSON.stringify(this.issues));

    this.formSubmitted = true;
    if (Repair.valid) {
      this.bookRepair.latitude = this.Location.lat;
      this.bookRepair.longitude = this.Location.lng;
      console.log(JSON.stringify(this.bookRepair));

      localStorage.setItem('deviceProblem', JSON.stringify(this.bookRepair));
      console.log(this.bookRepair);

      this.headerService.searchStore(this.bookRepair).subscribe(
        (response: ResponseType) => {
          console.log(response);

          response.data.forEach((e) => {
            if (e.pricing.length) {
              this.Data.push(e);
            }
          });
          console.log(this.Data);
          localStorage.removeItem('Shoplist');
          localStorage.setItem('Shoplist', JSON.stringify(this.Data));

          for (var i = 0; i < this.Data.length; i++) {
            // console.log(this.Data[i].pricing[0].price);
            this.shopmarker = {
              latitude: this.Data[i].latitude,
              longitude: this.Data[i].longitude,
              price: {
                text: this.Data[i].pricing[0].price.toString(),
                color: 'white',
                fontWeight: '500',
                fontSize: '20px',
              },
              icon: {
                url:
                  'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e',
                scaledSize: {
                  width: 100,
                  height: 70,
                },
              },
            };

            this.Marker.push(this.shopmarker);
          }

          localStorage.setItem('shopmarker', JSON.stringify(this.Marker));

          console.log(this.Marker);
          window.location.reload();
          // this.router.navigate([
          //   '/map',
          //   { storeData: JSON.stringify(response['data']) },
          // ]);
        },
        (error) => {}
      );
    } else {
      return;
    }
  }
}
