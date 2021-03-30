import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { ShopService } from "src/@theme/Services/shop.service";
import { StoreTokenService } from "src/@theme/Services/store-token.service";
import { UploadService } from "src/@theme/Services/upload.service";
import { MapService } from "src/@theme/Services/map.service";
import { AddProductComponent } from "./add-product/add-product.component";
import { HeaderService } from "src/@theme/Services/header.service";
// import { AddproductComponent } from './addproduct/addproduct.component';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  rating3;
  shop: any[] = [];
  lat: any;
  lng: any;
  price: {} = {
    text: "$00",
    color: "white",
    fontWeight: "500",
    fontSize: "20px",
  };
  Location = {
    lat: 0,
    lng: 0,
    Icon: {},
  };

  ourmark = {
    icon: {
      url:
        "https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shopmark.png?alt=media&token=a88b489d-4f6d-470a-9aa4-211f82ce6976",
      scaledSize: {
        width: 135,
        height: 115,
      },
    },
  };

  shopmark = {
    icon: {
      url:
        "https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e",
      scaledSize: {
        width: 90,
        height: 70,
      },
    },
  };

  renderOptions = {
    suppressMarkers: true,
  };

  markerOptions = {
    origin: {
      icon:
        "https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shopmark.png?alt=media&token=a88b489d-4f6d-470a-9aa4-211f82ce6976",
      draggable: true,
    },
    destination: {
      icon:
        "https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e",
      label: "$00",
      color: "white",
      fontWeight: "500",
      fontSize: "20px",
    },
  };

  origin = { lat: 0, lng: 0 };
  destination = { lat: 0, lng: 0 };

  styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text",
      stylers: [
        {
          color: "#afa655",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  subscription: any;

  placeOrder: any = {
    shop_id: null,
    transactionId: "QQughobhhIuMTop",
    startTime: null,
    endTime: null,
    date: null,
    pickupLocation: null,
    dropLocation: null,
    Total_Price: null,
    details: [
      {
        device_id: null,
        problem_id: null,
        image: [],
        price: null,
      },
    ],
  };
  title = "My first AGM project";

  colorTone = "#000";
  per = 78;
  storeId: any;
  storeInfo: any[] = [];
  timeList: any[];
  cartInfo: any = {};
  files: File[] = [];
  imageUploaded: any[] = [];
  imageEditFlag: boolean = false;
  currentImageUrl: any = "";
  addedDeviceProblem;
  displayCartInfo = [
    {
      id: null,
      deviceName: null,
      problemName: null,
      total_amount: null,
      ANOBaseFees: null,
      ANOCommissionFees: null,
      price: null,
      images: null,
      imageFiles: File,
      problemId: null,
      deviceId: null,
    },
  ];
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
    this.Location = JSON.parse(localStorage.getItem("Location") || "[]");
    console.log(this.Location);
    this.lat = this.Location.lat;
    this.lng = this.Location.lng;
    this.origin.lat = this.Location.lat;
    this.origin.lng = this.Location.lng;
    console.log(this.origin);
    this.shop.push(JSON.parse(localStorage.getItem("Shop") || "[]"));
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
  }

  addRepairDevice() {
    const modalRef = this.modalService.open(AddProductComponent);
    //   modalRef.componentInstance.shopId = this.storeId.id;
    modalRef.result.then((result) => {
      console.log(result);
      this.displayCartInfo.push(result);
      // this.cartInfo = result;
      // console.log(this.cartInfo);
      // this.storeTokenService.set("cart_id", result.cart_id);
      // this.getCartData();
    });
    console.log(this.displayCartInfo);
  }

  setPreviouslyAddedDeviceIssue() {
    //set static id for priously selected device problem
    this.displayCartInfo[0].id = 1;
    //get priously selected problem device
    this.addedDeviceProblem = JSON.parse(localStorage.getItem("deviceProblem"));
    console.log(this.addedDeviceProblem);
    //set Device Name
    JSON.parse(localStorage.getItem("deviceList")).forEach((element) => {
      if (element.id == this.addedDeviceProblem.device) {
        this.displayCartInfo[0].deviceId = element.id;
        this.displayCartInfo[0].deviceName = element.full_name;
      }
    });
    //set Problem Name
    let getProblemList = {
      device_id: this.addedDeviceProblem.device,
    };
    this.headerService.getIssueListById(getProblemList).subscribe(
      (data) => {
        data["data"].forEach((element) => {
          if (element.id == this.addedDeviceProblem.problem) {
            this.displayCartInfo[0].problemName = element.problem.problemName;
            this.displayCartInfo[0].problemId = element.id;
          }
        });
      },
      (error) => {}
    );
    //set Expected Price
    let getExpectedPrice = {
      device: this.addedDeviceProblem.device,
      problem: this.addedDeviceProblem.problem,
      shop_id: this.shop[0].id,
    };
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data["data"]);
        this.displayCartInfo[0].total_amount = data["data"][0].TotalAmount;
        this.displayCartInfo[0].ANOBaseFees = data["data"][0].ANOBaseFees;
        this.displayCartInfo[0].ANOCommissionFees =
          data["data"][0].ANOCommissionFees;
        this.displayCartInfo[0].price = data["data"][0].price;
      },
      (error) => {}
    );
  }

  getCartData() {
    this.shopService.getCartDetail().subscribe((data) => {
      this.cartInfo = data["data"];
      console.log(this.cartInfo);
    });
  }
  getTimeAccoedingToDate() {
    let getTimeObj = {
      durating: 60,
      shopId: this.shop[0].id,
      date: this.placeOrder.date,
    };
    this.shopService.getTimeByDate(getTimeObj).subscribe((data) => {
      this.timeList = data["data"];
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
    console.log(this.displayCartInfo);
  }

  onSelect(event, id) {
    console.log(event);
    console.log(id);
    this.files.push(...event.addedFiles);
    this.files.forEach((element) => {
      this.upload(element);
    });
    this.uploadService.imageLocationUrl.subscribe((x) => {
      this.displayCartInfo.forEach((element) => {
        if (element.id == id) {
          element.images = x;
          element.imageFiles = event.addedFiles;
        }
      });
      this.currentImageUrl = x;
      console.log("Current Image Url", this.currentImageUrl);
    });
    console.log(this.displayCartInfo);
  }
  async upload(file) {
    console.log("upload file function called");
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
        this.displayCartInfo.splice(index, 1);
      }
    });
    console.log(this.displayCartInfo);
    console.log(event);
  }

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

  proceed() {
    console.log("set");
    console.log(this.displayCartInfo);
    console.log(this.placeOrder);
    let obj = {
      device_id: null,
      problem_id: null,
      price: null,
      image: [],
    };
    Object.keys(this.placeOrder.details).forEach((key) => {
      console.log((this.placeOrder.details[key].device_id = 1));
      console.log((this.placeOrder.details[key].problem_id = 3));
      console.log(this.placeOrder.details[key]);
    });
    //   let Total_price: Number = 0;
    //   this.cartInfo.forEach((element) => {
    //     Total_price = Total_price + element.price;
    //     // this.placeOrder.details.push({
    //     //   device_id: element.device_id,
    //     //   brand_id: element.brand_id,
    //     //   problem_id: element.problem_id,
    //     //   price: element.price,
    //     // });
    //   });
    //   this.placeOrder.Total_Price = Total_price;
    //   this.shopService.placeOrder(this.placeOrder).subscribe((data) => {
    //     console.log(data["data"]);
    //   });
    //   console.log("total price", Total_price);
    //   console.log(this.cartInfo);
    //   console.log(this.placeOrder);

    // this.placeOrder.details.forEach((element, index) => {
    //   this.cartInfo.forEach((ele, index) => {
    //     element[index].device_id = ele[index].device_id;
    //   });
    // });
    // let copyCartInfo: any[];
    // this.cartInfo.forEach((element) => {
    //   copyCartInfo.push(element.device_id);
    // });
    // console.log("copy ", copyCartInfo);
  }
}
