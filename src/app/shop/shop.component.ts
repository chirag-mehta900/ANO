import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from 'src/@theme/Services/shop.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { WarningComponent } from './warning/warning.component';

import { UploadService } from 'src/@theme/Services/upload.service';
import { MapService } from 'src/@theme/Services/map.service';
import { BookRepairComponent } from '../header-module/book-repair/book-repair.component';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  rating3 = 3;
  shop: any[] = [];
  lat: any;
  lng: any;
  price: {} = {
    text: '$00',
    color: 'white',
    fontWeight: '500',
    fontSize: '20px',
  };
  check: any;
  bookRepair = {
    device_id: null,
    brand_id: null,
    problem_id: null,
    price: null,
    ANOBaseFees: null,
    ANOCommissionFees: null,
    ShopCommissionFees: null,
    TotalAmount: null,
    shop_id: null,
    image: [],
    cart_id: null,
    user_id: null,
  };

  Location = {
    lat: 0,
    lng: 0,
    Icon: {},
  };

  ourmark = {
    icon: {
      url:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      scaledSize: {
        width: 90,
        height: 110,
      },
    },
  };

  shopmark = {
    icon: {
      url:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/MicrosoftTeams-image%20(8).png?alt=media&token=6daea4dc-bc59-425f-8862-c2c407b6939a',
      scaledSize: {
        width: 40,
        height: 50,
      },
    },
  };

  renderOptions = {
    suppressMarkers: true,
  };

  markerOptions = {
    origin: {
      icon:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      draggable: true,
      size: {
        width: 10,
        height: 6,
      },
    },
    destination: {
      icon:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e',
      label: {
        text: '',
        color: 'white',
        fontWeight: '500',
        fontSize: '20px',
      },
    },
  };

  origin = { lat: 0, lng: 0 };
  destination = { lat: 0, lng: 0 };

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

  subscription: any;

  placeOrder: any = {
    shop_id: 1,
    transactionId: 'QQughobhhIuMTop',
    startTime: null,
    endTime: null,
    date: null,
    pickupLocation: null,
    dropLocation: null,
    Total_Price: null,
    details: [],
  };
  title = 'My first AGM project';

  colorTone = '#000';
  per = 78;
  storeId: any;
  ShopList: any[] = [];
  filter: any;
  deviceproblem: {};
  timeList: any[];
  cartInfo: any = {};
  files: File[] = [];
  imageUploaded: any[] = [];
  imageEditFlag: boolean = false;
  currentImageUrl: any = '';
  averageRating: number;
  averageCalculateRating: number;
  ratings: any[];
  //To Count No of star
  oneStar = 0;
  twoStar = 0;
  threeStar = 0;
  fourStar = 0;
  fiveStar = 0;

  //to calculate Value for review bar
  oneStarRatingBarValue = 0;
  twoStarRatingBarValue = 0;
  threeStarRatingBarValue = 0;
  fourStarRatingBarValue = 0;
  fiveStarRatingBarValue = 0;

  //to give static star value
  starValueOne = 1;
  starValueTwo = 2;
  starValueThree = 3;
  starValueFour = 4;
  starValueFive = 5;

  expectedresponse: any;
  //Price Factors
  shopCommission;
  baseFee;
  ANOFee;
  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private modalService: NgbModal,
    private storeTokenService: StoreTokenService,
    private uploadService: UploadService,
    private profile: ProfileService,
    private router: Router
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.filter = JSON.parse(localStorage.getItem('filter') || '[]');
    console.log(this.filter);

    this.profile.responseShopId.subscribe((id) => {
      console.log(id, 'new');
      if (id != 0) {
        this.storeId = id;
        this.getStoreDetail();
      } else {
        this.storeId = JSON.parse(this.route.snapshot.paramMap.get('id'));
        console.log(this.storeId, 'new');
        this.getStoreDetail();
      }
    });
    this.ShopList = JSON.parse(localStorage.getItem('Shoplist') || '[]');

    this.ShopList.forEach((e) => {
      if (e.id == this.storeId) {
        this.shop.push(e);
      }
    });

    this.deviceproblem = JSON.parse(
      localStorage.getItem('deviceProblem') || '[]'
    );
    console.log(this.deviceproblem, 'problem');

    // this.storeId = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    console.log(this.Location);

    this.lat = this.Location.lat;
    this.lng = this.Location.lng;

    this.origin.lat = this.Location.lat;
    this.origin.lng = this.Location.lng;
    console.log(this.origin);

    this.markerOptions.destination.label.text =
      '$' + this.shop[0].pricing[0].price.toString();
    console.log(this.markerOptions);
    ` `;
    this.destination.lat = this.shop[0].latitude;
    this.destination.lng = this.shop[0].longitude;

    console.log(this.destination);

    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    this.getAnoFee();
    this.getBaseFee();
    //this.getCartData();
  }
  getStoreDetail() {
    this.shopService.getStoreDetailById(this.storeId).subscribe(
      (data) => {
        // this.shop.push(data['data']);
        console.log(data);

        // this.storeInfo = data['data'];
        this.shopCommission = data['data'].shopCommision;
        this.averageRating = Math.round(data['data'].average_rating);
        this.ratings = data['data'].ratings;
        this.averageCalculateRating = parseInt(
          String((this.averageRating / 5) * 100)
        );

        // const interval = setInterval(() => {
        //   if (this.shop.length > 0) {

        //     clearInterval(interval);
        //   }
        // }, 1000);

        this.calculateReviewBarValue();
      },
      (error) => {}
    );
  }
  calculateReviewBarValue() {
    this.ratings.forEach((element) => {
      switch (element.rating) {
        case 1:
          this.oneStar++;
          break;
        case 2:
          this.twoStar++;
          break;
        case 3:
          this.threeStar++;
          break;
        case 4:
          this.fourStar++;
          break;
        case 5:
          this.fiveStar++;
          break;
      }
    });
    let totalCount =
      this.oneStar +
      this.twoStar +
      this.threeStar +
      this.fourStar +
      this.fiveStar;
    this.oneStarRatingBarValue = parseInt(
      String((this.oneStar / totalCount) * 100)
    );
    this.twoStarRatingBarValue = parseInt(
      String((this.twoStar / totalCount) * 100)
    );
    this.threeStarRatingBarValue = parseInt(
      String((this.threeStar / totalCount) * 100)
    );
    this.fourStarRatingBarValue = parseInt(
      String((this.fourStar / totalCount) * 100)
    );
    this.fiveStarRatingBarValue = parseInt(
      String((this.fiveStar / totalCount) * 100)
    );
  }
  getAnoFee() {
    this.shopService.getAnoFee().subscribe((data) => {
      this.ANOFee = data['data'][0].value;
    });
  }
  getBaseFee() {
    this.shopService.getBaseFee().subscribe((data) => {
      this.baseFee = data['data'][0].value;
    });
  }
  goToCart() {
    console.log(this.shop);

    this.check = JSON.parse(localStorage.getItem('filter') || '[]');

    if (this.check) {
      console.log('bookrepair remain');
      console.log(this.check);

      this.modalService.open(BookRepairComponent);
    } else {
      var obj = {
        user_id: JSON.parse(localStorage.getItem('user_id') || '[]'),
      };

      this.shopService.getShopifromcart(obj).subscribe(
        (data) => {
          console.log(data);
          console.log(data['data']['shop_id']);

          if (
            data['data']['shop_id'] == this.shop[0]['id'] ||
            data['data']['shop_id'] == 0
          ) {
            console.log('same');
            this.product();
          } else {
            this.modalService.open(WarningComponent);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  product() {
    let getExpectedPrice = {
      device_id: this.deviceproblem['device'],
      problem_id: this.deviceproblem['problem'],
      shop_id: this.shop[0]['id'],
    };
    console.log(getExpectedPrice);
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data);

        console.log(data['data']);
        this.expectedresponse = data['data'];

        this.bookRepair.ANOBaseFees = Number(
          this.expectedresponse[0].ANOBaseFees
        );
        this.bookRepair.ANOCommissionFees = this.expectedresponse[0].ANOCommissionFees;
        this.bookRepair.ShopCommissionFees = this.expectedresponse[0].ShopCommissionFees;
        this.bookRepair.TotalAmount = this.expectedresponse[0].TotalAmount;
        this.bookRepair.price = this.expectedresponse[0].price;
        this.bookRepair.brand_id = this.expectedresponse[0].brand_id;
        this.bookRepair.user_id = JSON.parse(
          localStorage.getItem('user_id') || '[]'
        );
        this.bookRepair.shop_id = this.expectedresponse[0].shop_id;
        this.bookRepair.device_id = this.expectedresponse[0].device_id;
        this.bookRepair.problem_id = this.expectedresponse[0].problem_id;

        console.log(this.bookRepair, 'fresh');

        this.shopService.addCartData(this.bookRepair).subscribe(
          (data) => {
            console.log(data);
            console.log(data['data'][0]);

            this.router.navigate(['/cart']);
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }
  // addRepairDevice() {
  //   const modalRef = this.modalService.open(AddproductComponent);
  //   modalRef.componentInstance.shopId = this.storeId.id;
  //   modalRef.result.then((result) => {
  //     this.cartInfo = result;
  //     console.log(this.cartInfo);
  //     this.storeTokenService.set("cart_id", result.cart_id);
  //     this.getCartData();
  //   });
  // }
  // getCartData() {
  //   this.shopService.getCartDetail().subscribe((data) => {
  //     this.cartInfo = data["data"];
  //     console.log(this.cartInfo);
  //   });
  // }
  // getTimeAccoedingToDate() {
  //   let getTimeObj = {
  //     durating: 60,
  //     shopId: this.storeId.id,
  //     date: this.placeOrder.date,
  //   };
  //   this.shopService.getTimeByDate(getTimeObj).subscribe((data) => {
  //     this.timeList = data["data"];
  //   });
  // }
  // setTime(event) {
  //   console.log(this.timeList);
  //   console.log(event);
  //   this.timeList.forEach((element) => {
  //     if (element.id == event) {
  //       this.placeOrder.startTime = element.startTime;
  //       this.placeOrder.endTime = element.endTime;
  //     }
  //   });
  // }

  // onSelect(event, id) {
  //   console.log(event);
  //   console.log(id);
  //   this.cartInfo.forEach((element) => {
  //     if (element.id == id) {
  //       element.image = event.addedFiles;
  //       console.log("added Image", element.image);
  //     }
  //   });
  //   console.log(this.cartInfo);
  //   this.files.push(...event.addedFiles);
  //   this.files.forEach((element) => {
  //     this.upload(element);
  //     console.log(element);
  //   });
  //   console.log(this.files);
  //   let imgUrl = this.storeTokenService.get("ImgUrl");
  //   console.log(imgUrl);
  //   this.uploadService.imageLocationUrl.subscribe((x) => {
  //     console.log("Subscribed Url", x);
  //     this.currentImageUrl = x;
  //     console.log("Current Image Url", this.currentImageUrl);
  //   });
  //   console.log("on select CurrentUrl ", this.currentImageUrl);

  //   this.cartInfo.forEach((element) => {
  //     if (element.id == id) {
  //       element.image = imgUrl;
  //       this.placeOrder.details.push({
  //         image: this.currentImageUrl,
  //         device_id: element.device_id,
  //         brand_id: element.brand_id,
  //         problem_id: element.problem_id,
  //         price: element.price,
  //       });
  //     }
  //   });
  //   this.imageUploaded.push({ id: id, imgUrl: imgUrl });
  //   console.log(this.imageUploaded);
  //   this.imageEditFlag = false;

  //   // console.log("Location Url", this.imageLocationUrl);
  //   this.subscription = this.uploadService.imageLocationUrl;
  //   console.log(this.subscription);
  // }
  // async upload(file) {
  //   // const file = this.selectedFiles.item(0);
  //   console.log("upload file function called");
  //   await this.uploadService.uploadFile(file);
  //   //this.uploadService.uploadfile(file);
  // }

  // onRemove(event) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }

  // setEditToChangeImage() {
  //   this.imageEditFlag = true;
  // }

  // procced() {
  //   if (
  //     this.placeOrder.date &&
  //     this.placeOrder.startTime &&
  //     this.placeOrder.endTime
  //   ) {
  //     console.log("set");
  //     let Total_price: Number = 0;
  //     this.cartInfo.forEach((element) => {
  //       Total_price = Total_price + element.price;
  //       // this.placeOrder.details.push({
  //       //   device_id: element.device_id,
  //       //   brand_id: element.brand_id,
  //       //   problem_id: element.problem_id,
  //       //   price: element.price,
  //       // });
  //     });
  //     this.placeOrder.Total_Price = Total_price;
  //     this.shopService.placeOrder(this.placeOrder).subscribe((data) => {
  //       console.log(data["data"]);
  //     });
  //     console.log("total price", Total_price);
  //     console.log(this.cartInfo);
  //     console.log(this.placeOrder);
  //   } else {
  //     console.log("not set");
  //     return;
  //   }
  //   // this.placeOrder.details.forEach((element, index) => {
  //   //   this.cartInfo.forEach((ele, index) => {
  //   //     element[index].device_id = ele[index].device_id;
  //   //   });
  //   // });
  //   // let copyCartInfo: any[];
  //   // this.cartInfo.forEach((element) => {
  //   //   copyCartInfo.push(element.device_id);
  //   // });
  //   // console.log("copy ", copyCartInfo);
  // }
}
