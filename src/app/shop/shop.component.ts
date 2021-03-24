import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { MapService } from "src/@theme/Services/map.service";
import { ShopService } from "src/@theme/Services/shop.service";
import { StoreTokenService } from "src/@theme/Services/store-token.service";
import { UploadService } from "src/@theme/Services/upload.service";
import { AddproductComponent } from "./addproduct/addproduct.component";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  placeOrder: any = {
    shop_id: 1,
    transactionId: "QQughibhhIuMTop",
    startTime: null,
    endTime: null,
    date: null,
    pickupLocation: null,
    dropLocation: null,
    Total_Price: null,
    details: [],
  };
  title = "My first AGM project";
  lat = 21.1588329;
  lng = 72.7688111;
  colorTone = "#000";
  per = 78;
  storeId: any;
  storeInfo: any[] = [];
  timeList: any[];
  cartInfo: any = {};
  files: File[] = [];

  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private modalService: NgbModal,
    private storeTokenService: StoreTokenService,
    private mapService: MapService,
    private uploadService: UploadService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.storeId = JSON.parse(this.route.snapshot.paramMap.get("id"));
    this.getStoreDetail();
    this.getCartData();
    console.log(this.storeId);
  }
  getStoreDetail() {
    this.shopService.getStoreDetailById(this.storeId.id).subscribe(
      (data) => {
        this.storeInfo.push(data["data"]);
      },
      (error) => {}
    );
  }
  addRepairDevice() {
    const modalRef = this.modalService.open(AddproductComponent);
    modalRef.componentInstance.shopId = this.storeId.id;
    modalRef.result.then((result) => {
      this.cartInfo = result;
      console.log(this.cartInfo);
      this.storeTokenService.set("cart_id", result.cart_id);
      this.getCartData();
    });
  }
  getCartData() {
    this.shopService.getCartDetail().subscribe((data) => {
      this.cartInfo = data["data"];
    });
  }
  getTimeAccoedingToDate() {
    let getTimeObj = {
      durating: 60,
      shopId: this.storeId.id,
      date: this.placeOrder.date,
    };
    this.shopService.getTimeByDate(getTimeObj).subscribe((data) => {
      this.timeList = data["data"];
    });
  }
  setTime(event) {
    console.log(this.timeList);
    console.log(event);
    this.timeList.forEach((element) => {
      if (element.id == event) {
        this.placeOrder.startTime = element.startTime;
        this.placeOrder.endTime = element.endTime;
      }
    });
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.files.forEach((element) => {
      //this.upload(element);
      console.log(element);
    });
  }
  upload(file) {
    // const file = this.selectedFiles.item(0);
    console.log("upload file function called");
    let q = this.uploadService.uploadFile(file).subscribe((response) => {
      console.log(response);
    });
    console.log("From Calling", q);
    //this.uploadService.uploadfile(file);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  procced() {
    if (
      this.placeOrder.date &&
      this.placeOrder.startTime &&
      this.placeOrder.endTime
    ) {
      console.log("set");
      this.cartInfo.forEach((element, index) => {
        this.placeOrder.details.push({
          device_id: element.device_id,
          brand_id: element.brand_id,
          problem_id: element.problem_id,
          image: element.problem.image,
          price: element.price,
        });
      });

      console.log(this.cartInfo);
      console.log(this.placeOrder.date);
      console.log(this.placeOrder);
    } else {
      console.log("not set");
      return;
    }
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
