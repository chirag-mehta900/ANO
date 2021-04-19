import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from 'src/@theme/Services/shop.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { UploadService } from 'src/@theme/Services/upload.service';
import { MapService } from 'src/@theme/Services/map.service';
import { AddProductComponent } from './add-product/add-product.component';
import { HeaderService } from 'src/@theme/Services/header.service';
import { LoginComponent } from '../header-module/login/login.component';
import { time } from 'node:console';
import * as moment from 'moment';

// import { AddproductComponent } from './addproduct/addproduct.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  startdate: any = moment().format('L');

  datePickerConfig = {
    format: 'DD-MM-YYYY',
    date: this.startdate,
  };

  rating3;
  userName: any = '';
  shop: any[] = [];
  lat: any;
  lng: any;

  ANOBaseFeess: number = 0;
  ANOCommissionFeess: number = 0;
  Prices: number = 0;
  ShopCommissionFeess: number = 0;

  expecteddate: any;
  expectedtime: any;
  price: {} = {
    text: '$00',
    color: 'white',
    fontWeight: '500',
    fontSize: '20px',
  };
  Location = {
    lat: 0,
    lng: 0,
    Icon: {},
  };
  dropLocation = {
    lat: 0,
    lng: 0,
  };

  pickupLocation = {
    lat: 0,
    lng: 0,
  };

  ourmark = {
    icon: {
      url:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/pin.svg?alt=media&token=6de944f2-889f-4658-8d86-f6fce983ac5c',
      scaledSize: {
        width: 30,
        height: 30,
      },
    },
  };

  renderOptions = {
    suppressMarkers: true,
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
  distanceInMiles: any;
  deliveryPrices: any;
  placeOrder: any = {
    shop_id: null,
    transactionId: null,
    startTime: null,
    endTime: null,
    date: null,
    pickupLocation: null,
    repairedDate: null,
    expectedDelivery: null,
    dropLocation: null,
    Total_Price: null,
    details: [
      {
        device_id: null,
        problem_id: null,
        image: ([] = []),
        price: null,
      },
    ],
  };
  title = 'My first AGM project';

  colorTone = '#000';
  per = 78;
  storeId: any;
  storeInfo: any[] = [];
  timeList: any[] = [];
  cartInfo: any = {};
  files: File[] = [];
  temp: File[] = [];
  issues: any[] = [];
  imageUploaded: any[] = [];
  Address: any;
  date: any = '';
  pickupAddress: any;
  dropAddress: any;
  imageEditFlag: boolean = false;
  Filter: boolean = false;
  currentImageUrl: any = '';
  addedDeviceProblem;
  displayCartInfo = [];
  today;
  new;
  modifiedToday;
  totalCartAmounts = 0;
  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private modalService: NgbModal,
    private storeTokenService: StoreTokenService,
    private uploadService: UploadService,
    private router: Router,
    private headerService: HeaderService,
    private mapService: MapService
  ) {
    config.max = 5;
    config.readonly = true;
    this.date = moment().format('L');
    console.log(this.date);
    console.log(this.datePickerConfig);
  }

  ngOnInit(): void {
    localStorage.setItem('filter', JSON.stringify(this.Filter));
    var id = JSON.parse(localStorage.getItem('user_id') || '[]');

    this.headerService.getAllCart(id).subscribe((response) => {
      console.log(response);
      this.shop.push(response['data'].shop);
      localStorage.setItem('Shop', JSON.stringify(this.shop[0]));
      this.displayCartInfo = response['data'].devices;

      this.ANOBaseFeess = Number(response['data'].grandTotalOfBaseFees);
      this.ANOCommissionFeess = Number(
        response['data'].grandTotalOfANOCommissionFees
      );
      this.ShopCommissionFeess = Number(
        response['data'].grandTotalOfShopCommissionFees
      );
      this.Prices = Number(response['data'].grandTotalOfPartsFees);

      this.totalCartAmounts = response['data'].grandTotal;

      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

      this.Address = JSON.parse(localStorage.getItem('Address') || '[]');
      this.pickupAddress = this.Address;
      this.dropAddress = this.Address;

      console.log(this.Location);
      this.lat = this.Location.lat;
      this.lng = this.Location.lng;
      this.origin.lat = this.Location.lat;
      this.origin.lng = this.Location.lng;
      console.log(this.origin);
      this.destination.lat = this.shop[0].latitude;
      this.destination.lng = this.shop[0].longitude;
      console.log(this.destination);
      console.log(this.shop);

      //set Shop id in place order object
      this.placeOrder.shop_id = this.shop[0].id;

      //rating
      this.rating3 = parseInt(this.shop[0].average_rating);

      var data = {
        toLat: this.Location.lat,
        toLng: this.Location.lng,
        fromLat: this.shop[0].latitude,
        fromLng: this.shop[0].longitude,
      };
      console.log(data, 'distance');

      this.mapService.getDistanceInMile(data).subscribe((data) => {
        this.distanceInMiles = data['data'][0]['elements'][0].distance.text;
        // 1. [+-]?: Optional + or - sign before number
        // 2. \d+: Match one or more numbers
        // 3. (?:\.\d+)?: Optional decimal point. ?: denotes non-capturing group.
        // 4. g flag: To get all matches
        var distance = this.distanceInMiles.match(/[+-]?\d+(?:\.\d+)?/g);
        this.deliveryPrices = distance * 0.6;
        this.deliveryPrices = Number(this.deliveryPrices.toFixed(2));

        this.totalCartAmounts += this.deliveryPrices;
        // this.setPreviouslyAddedDeviceIssue();
      });

      //get priously selected problem device

      this.getCurrentDate();
      this.getTimeAccoedingToDate();

      var date = Date.now();
      console.log(date);
      this.getrepairtime(date, 48);
    });

    // this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    // this.Address = JSON.parse(localStorage.getItem('Address') || '[]');
    // this.pickupAddress = this.Address;
    // this.dropAddress = this.Address;

    // console.log(this.Location);
    // this.lat = this.Location.lat;
    // this.lng = this.Location.lng;
    // this.origin.lat = this.Location.lat;
    // this.origin.lng = this.Location.lng;
    // console.log(this.origin);
    // this.destination.lat = this.shop[0].latitude;
    // this.destination.lng = this.shop[0].longitude;
    // console.log(this.destination);
    // console.log(this.shop);

    // //set Shop id in place order object
    // this.placeOrder.shop_id = this.shop[0].id;

    // //rating
    // this.rating3 = parseInt(this.shop[0].average_rating);

    // var data = {
    //   toLat: this.Location.lat,
    //   toLng: this.Location.lng,
    //   fromLat: this.shop[0].latitude,
    //   fromLng: this.shop[0].longitude,
    // };
    // console.log(data, 'distance');

    // this.mapService.getDistanceInMile(data).subscribe((data) => {
    //   this.distanceInMiles = data['data'][0]['elements'][0].distance.text;
    //   // 1. [+-]?: Optional + or - sign before number
    //   // 2. \d+: Match one or more numbers
    //   // 3. (?:\.\d+)?: Optional decimal point. ?: denotes non-capturing group.
    //   // 4. g flag: To get all matches
    //   var distance = this.distanceInMiles.match(/[+-]?\d+(?:\.\d+)?/g);
    //   this.deliveryPrice = distance * 0.6;
    //   this.deliveryPrice = Number(this.deliveryPrice.toFixed(2));
    //   this.setPreviouslyAddedDeviceIssue();
    // });

    //get priously selected problem device

    // this.getCurrentDate();
    // this.getTimeAccoedingToDate();
    // this.getrepairtime(36);

    // var finaldate =  new Date(this.new)
    // console.log(finaldate);

    // var newdate = Date.now(this.new + 36*)

    // console.log(moment().add(3, 'days').calendar(),"time");
  }

  getrepairtime(date: any, h: any) {
    console.log(date);
    console.log(h);

    this.new = date + h * 60 * 60 * 1000;
    console.log(this.new);

    this.expecteddate = moment(this.new).format('YYYY-MM-DD');
    console.log(this.expecteddate);

    this.expectedtime = moment(this.new).format('HH:mm:ss');
    console.log(this.expectedtime);

    this.placeOrder.repairedDate = this.expecteddate;
    this.placeOrder.expectedDelivery = moment(this.new).format('HH:mm:ss');
  }

  getCurrentDate() {
    this.today = new Date();
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;
    this.placeOrder.date = this.today;
    this.startdate = this.today;
    this.modifiedToday = mm + '/' + dd + '/' + yyyy;
  }
  addRepairDevice() {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.result.then((result) => {
      console.log(result);

      this.displayCartInfo.push(result);
      console.log(this.displayCartInfo, 'new');

      this.recalculateTotalCartAmount();
    });
    //this.recalculateTotalCartAmount();
  }

  recalculateTotalCartAmount() {
    this.totalCartAmounts = 0;
    this.ANOBaseFeess = 0;
    this.ANOCommissionFeess = 0;
    this.ShopCommissionFeess = 0;
    this.Prices = 0;
    this.displayCartInfo.forEach((element) => {
      this.totalCartAmounts += Number(element.TotalAmount.toFixed(2));
      this.ANOBaseFeess += Number(element.ANOBaseFees.toFixed(2));
      this.ANOCommissionFeess += Number(element.ANOCommissionFees.toFixed(2));
      this.ShopCommissionFeess += Number(element.ShopCommissionFees.toFixed(2));
      this.Prices += Number(element.price.toFixed(2));
    });
    this.totalCartAmounts += this.deliveryPrices;
    // this.ANOBaseFeess = Number(this.ANOBaseFeess.toFixed(2));
    this.totalCartAmounts = Number(this.totalCartAmounts.toFixed(2));
    console.log(this.totalCartAmounts, 'hey');
  }

  setPreviouslyAddedDeviceIssue() {
    //set static id for priously selected device problem

    //get priously selected problem device
    this.addedDeviceProblem = JSON.parse(localStorage.getItem('deviceProblem'));

    // this.ANOBaseFeess = Number(this.addedDeviceProblem.ANOBaseFees);
    // this.ANOCommissionFeess = this.addedDeviceProblem.ANOCommissionFees;
    // this.Prices = this.addedDeviceProblem.price;

    console.log(this.addedDeviceProblem);
    //set Device Name
    JSON.parse(localStorage.getItem('deviceList')).forEach((element) => {
      if (element.id == this.addedDeviceProblem.device) {
        this.displayCartInfo[0].deviceId = element.id;
        this.displayCartInfo[0].deviceName = element.full_name;
        this.displayCartInfo[0].problemId = this.addedDeviceProblem.problem;
      }
    });

    JSON.parse(localStorage.getItem('issues')).forEach((element) => {
      if (element.problemId == this.displayCartInfo[0].problemId) {
        this.displayCartInfo[0].problemName = element.problem;
      }
    });

    console.log(this.displayCartInfo);
    //set Problem Name
    // let getProblemList = {
    //   device_id: this.addedDeviceProblem.device,
    // };
    // this.headerService.getIssueListById(getProblemList).subscribe(
    //   (data) => {
    //     data['data'].forEach((element) => {
    //       if (element.id == this.addedDeviceProblem.problem) {
    //         this.displayCartInfo[0].problemName = element.problem.problemName;
    //         this.displayCartInfo[0].problemId = element.id;
    //       }
    //     });
    //   },
    //   (error) => {}
    // );
    //set Expected Price
    let getExpectedPrice = {
      device_id: this.addedDeviceProblem.device,
      problem_id: this.addedDeviceProblem.problem,
      shop_id: this.shop[0].id,
    };
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data['data']);

        this.totalCartAmounts = this.displayCartInfo[0].total_amount =
          data['data'][0].TotalAmount;

        this.ANOBaseFeess = this.displayCartInfo[0].ANOBaseFees = Number(
          data['data'][0].ANOBaseFees
        );

        this.ANOCommissionFeess = this.displayCartInfo[0].ANOCommissionFees =
          data['data'][0].ANOCommissionFees;

        this.displayCartInfo[0].ShopCommissionFees =
          data['data'][0].ShopCommissionFees;

        this.Prices = this.displayCartInfo[0].price = data['data'][0].price;

        this.displayCartInfo[0].id = 1;

        // this.recalculateTotalCartAmount();
      },
      (error) => {}
    );
    console.log(this.displayCartInfo, 'cart info');
  }

  // getCartData() {
  //   this.shopService.getCartDetail().subscribe((data) => {
  //     this.cartInfo = data["data"];
  //     console.log(this.cartInfo);
  //   });
  // }
  getTimeAccoedingToDate() {
    this.timeList = [];
    let getTimeObj = {
      durating: 30,
      shopId: this.shop[0].id,
      date: this.startdate,
    };
    console.log(getTimeObj);

    this.shopService.getTimeByDate(getTimeObj).subscribe((data) => {
      this.today = new Date();
      let hh = this.today.getHours();
      let mm = this.today.getMinutes();
      // console.log(hh, mm);
      // console.log(data["data"]);
      data['data'].forEach((element) => {
        var hour = new Date('1970-01-01 ' + element.startTime);
        if (hour.getHours() > hh) {
          this.timeList.push(element);
        }
      });

      if (this.timeList.length == 0) {
        console.log('empty');
        const tommorow = new Date(this.today);

        tommorow.setDate(tommorow.getDate() + 1);

        var dd = String(tommorow.getDate()).padStart(2, '0');
        var MM = String(tommorow.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = tommorow.getFullYear();
        this.startdate = yyyy + '-' + MM + '-' + dd;
        this.datePickerConfig.date = this.startdate;
        console.log(this.startdate);

        this.newtimelist(this.startdate);
      }

      this.placeOrder.startTime = this.timeList[0]['startTime'];
      this.placeOrder.endTime = this.timeList[0]['endTime'];
    });
  }
  setTime(event) {
    this.timeList.forEach((element) => {
      if (element.id == event.target.value) {
        this.placeOrder.startTime = element.startTime;
        this.placeOrder.endTime = element.endTime;
      }
    });
    console.log(this.placeOrder);
  }

  newtimelist(date) {
    this.timeList = [];
    let getTimeObj = {
      durating: 30,
      shopId: this.shop[0].id,
      date: date,
    };
    console.log(getTimeObj);

    this.shopService.getTimeByDate(getTimeObj).subscribe((data) => {
      data['data'].forEach((element) => {
        this.timeList.push(element);
      });
      console.log(this.timeList);
    });

    var DATE = new Date(this.startdate).getTime();
    console.log(DATE);

    this.getrepairtime(DATE, 48);
  }

  testDate(event) {
    console.log(event.date._d);
    var tempdate = event.date._d;

    var dd = String(tempdate.getDate()).padStart(2, '0');
    var MM = String(tempdate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tempdate.getFullYear();
    this.startdate = yyyy + '-' + MM + '-' + dd;
    console.log(this.startdate);

    var date = new Date(this.startdate).getTime();
    console.log(date);
    this.newtimelist(this.startdate);

    this.getrepairtime(date, 48);
    console.log('hello');
  }

  setpickupAddress(event) {
    this.pickupAddress = event;
    console.log(this.pickupAddress);
  }

  setdropAddress(event) {
    this.dropAddress = event;
    console.log(this.dropAddress);
  }

  onSelect(event, id) {
    console.log(event);
    console.log(id);
    this.files.push(...event.addedFiles);
    this.files.forEach((element) => {
      this.upload(element);
    });
    let arr = [];
    this.uploadService.imageLocationUrl.subscribe((x) => {
      this.displayCartInfo.forEach((element) => {
        arr.push(x);
        if (element.id == id) {
          element.images = arr;
          element.imageFiles = event.addedFiles;
        }
      });
      this.currentImageUrl = x;
      console.log('Current Image Url', this.currentImageUrl);
    });
    console.log(this.displayCartInfo);
  }
  async upload(file) {
    console.log('upload file function called');
    await this.uploadService.uploadFile(file);
  }
  onRemove(event, id) {
    console.log(event);
    this.displayCartInfo.forEach((element, index) => {
      if (element.id == id) {
        delete this.displayCartInfo[index].imageFiles;
        delete this.displayCartInfo[index].images;
      }
    });
    console.log(this.displayCartInfo);
  }

  deleteCartProduct(event) {
    this.shopService.deleteCartData(event).subscribe(
      (data) => {},
      (error) => {}
    );
    this.displayCartInfo.forEach((element, index) => {
      if (element.id == event) {
        this.totalCartAmounts -= element.total_amount;
        this.displayCartInfo.splice(index, 1);
      }
    });
    console.log(this.displayCartInfo);
    this.recalculateTotalCartAmount();
    console.log(event);
  }
  proceed() {
    //to calculate total cart amount
    let isLogedIn = localStorage.getItem('token');
    if (isLogedIn === null) {
      this.userName = null;
      if (this.modalService.hasOpenModals()) {
        this.modalService.dismissAll();
      }
      const modalRef = this.modalService.open(LoginComponent);
      modalRef.result.then((result) => {
        this.headerService.getUserName().subscribe((data) => {
          this.userName = data['data'].name;
          this.storeTokenService.set('user_id', data['data'].id);
          window.location.reload();
        });
      });
    } else {
      let totalCartAmount = 0;
      this.issues = JSON.parse(localStorage.getItem('issues') || '[]');

      this.issues.forEach((e) => {
        if (e.problemId == this.displayCartInfo[0].problemId) {
          this.displayCartInfo[0].problemName = e.problem;
        }
      });
      console.log(this.displayCartInfo);

      //Add product in cart
      this.displayCartInfo.forEach((element) => {
        this.placeOrder.details.push({
          device_id: element.device_id,
          problem_id: element.problem_id,
          price: element.TotalAmount,
          image: element.image,
        });
      });
      this.placeOrder.details.splice(0, 1);

      //calculating cart amount
      this.placeOrder.details.forEach((element) => {
        totalCartAmount += element.price;
      });
      this.placeOrder.Total_Price = this.totalCartAmounts;
      console.log(this.placeOrder);

      this.pickupLocation.lat = this.Location.lat;
      this.pickupLocation.lng = this.Location.lng;

      this.dropLocation.lat = this.shop[0].latitude;
      this.dropLocation.lng = this.shop[0].longitude;

      this.placeOrder.pickupLocation = this.pickupAddress;
      this.placeOrder.dropLocation = this.dropAddress;
      console.log(this.placeOrder, 'object');

      console.log(this.placeOrder.details[0].image);
      if (this.placeOrder.details[0].image == null) {
        this.placeOrder.details[0].image = [];
      }
      this.shopService.placeOrder(this.placeOrder).subscribe((response) => {
        console.log(response, 'placeOrder');

        //localStorage.setItem("PlaceOrder", JSON.stringify(this.placeOrder));
        var id = response['data'].id;
        console.log(id, 'id');
        localStorage.setItem('PlaceOrder', JSON.stringify(response['data']));

        this.router.navigate(['/checkout/', id]);
      });
    }
  }

  tConvert(time) {
    if (time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }

      var newTime = '';
      time.forEach((item, index) => {
        if (index !== 3) {
          newTime = newTime + item;
        }
      });
      return newTime; // return adjusted time or original string
    }
  }
}
