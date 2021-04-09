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
  rating3;
  userName: any = '';
  shop: any[] = [];
  lat: any;
  lng: any;
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
  pickupAddress: any;
  dropAddress: any;
  imageEditFlag: boolean = false;
  currentImageUrl: any = '';
  addedDeviceProblem;
  displayCartInfo = [
    {
      id: null,
      deviceName: null,
      problemName: null,
      total_amount: null,
      ANOBaseFees: null,
      ShopCommissionFees: null,
      ANOCommissionFees: null,
      price: null,
      images: null,
      imageFiles: File,
      problemId: null,
      deviceId: null,
    },
  ];
  today;
  new;
  modifiedToday;
  totalCartAmount = 0;
  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private modalService: NgbModal,
    private storeTokenService: StoreTokenService,
    private uploadService: UploadService,
    private router: Router,
    private headerService: HeaderService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
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
    this.shop.push(JSON.parse(localStorage.getItem('Shop') || '[]'));
    this.destination.lat = this.shop[0].latitude;
    this.destination.lng = this.shop[0].longitude;
    console.log(this.destination);
    console.log(this.shop);

    //set Shop id in place order object
    this.placeOrder.shop_id = this.shop[0].id;

    //rating
    this.rating3 = parseInt(this.shop[0].average_rating);

    //get priously selected problem device
    this.setPreviouslyAddedDeviceIssue();
    this.getCurrentDate();
    this.getTimeAccoedingToDate();
    this.getrepairtime(36);

    // var finaldate =  new Date(this.new)
    // console.log(finaldate);

    // var newdate = Date.now(this.new + 36*)

    // console.log(moment().add(3, 'days').calendar(),"time");
  }

  getrepairtime(h) {
    this.new = Date.now() + h * 60 * 60 * 1000;
    this.expecteddate = moment(this.new).format('YYYY-MM-DD');
    this.expectedtime = moment(this.new).format('HH:mm:ss');

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
    this.modifiedToday = mm + '/' + dd + '/' + yyyy;
  }
  addRepairDevice() {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.result.then((result) => {
      console.log(result);
      this.totalCartAmount += result.total_amount;
      this.displayCartInfo.push(result);

      for (var i = 0; i < this.displayCartInfo.length; i++) {
        this.displayCartInfo[i].id = i + 1;
      }

      console.log(this.displayCartInfo, 'new');
    });
    //this.recalculateTotalCartAmount();
  }

  recalculateTotalCartAmount() {
    this.totalCartAmount = 0;
    this.displayCartInfo.forEach((element) => {
      this.totalCartAmount += element.total_amount;
    });
  }

  setPreviouslyAddedDeviceIssue() {
    //set static id for priously selected device problem

    //get priously selected problem device
    this.addedDeviceProblem = JSON.parse(localStorage.getItem('deviceProblem'));
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
      device: this.addedDeviceProblem.device,
      problem: this.addedDeviceProblem.problem,
      shop_id: this.shop[0].id,
    };
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data['data']);

        this.totalCartAmount = this.displayCartInfo[0].total_amount =
          data['data'][0].TotalAmount;
        this.displayCartInfo[0].ANOBaseFees = data['data'][0].ANOBaseFees;
        this.displayCartInfo[0].ANOCommissionFees =
          data['data'][0].ANOCommissionFees;
        this.displayCartInfo[0].ShopCommissionFees =
          data['data'][0].ShopCommissionFees;

        this.displayCartInfo[0].price = data['data'][0].price;
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
      date: this.placeOrder.date,
    };
    // console.log(getTimeObj);

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
      console.log(this.timeList);

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
        this.totalCartAmount -= element.total_amount;
        this.displayCartInfo.splice(index, 1);
      }
    });
    console.log(this.displayCartInfo);
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
          device_id: element.deviceId,
          problem_id: Number(element.problemId),
          price: element.total_amount,
          image: element.images,
        });
      });
      this.placeOrder.details.splice(0, 1);

      //calculating cart amount
      this.placeOrder.details.forEach((element) => {
        totalCartAmount += element.price;
      });
      this.placeOrder.Total_Price = totalCartAmount;
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
        this.router.navigate(['/checkout/', id]);
      });

      localStorage.setItem('PlaceOrder', JSON.stringify(this.placeOrder));
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
