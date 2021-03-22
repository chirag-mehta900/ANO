import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal, NgbRatingConfig } from "@ng-bootstrap/ng-bootstrap";
import { ShopService } from "src/@theme/Services/shop.service";
import { AddproductComponent } from "./addproduct/addproduct.component";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  placeOrder = {
    shop_id: 1,
    transactionId: "QQughibhhIuMTop",
    startTime: null,
    endTime: null,
    date: null,
    pickupLocation: null,
    dropLocation: null,
    Total_Price: null,
    details: [
      {
        device: null,
        brand: null,
        price: null,
      },
    ],
  };
  title = "My first AGM project";
  lat = 21.1588329;
  lng = 72.7688111;
  colorTone = "#000";
  per = 78;
  storeId: any;
  storeInfo: any[] = [];
  timeList: any[];

  constructor(
    config: NgbRatingConfig,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private modalService: NgbModal
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.storeId = JSON.parse(this.route.snapshot.paramMap.get("id"));
    this.getStoreDetail();
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
}
