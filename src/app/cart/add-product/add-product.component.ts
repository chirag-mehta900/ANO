import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { ShopService } from "src/@theme/Services/shop.service";
import { StoreTokenService } from "src/@theme/Services/store-token.service";
import { UploadService } from "src/@theme/Services/upload.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  @Input() shopId;
  bookRepair = {
    brand_id: null,
    device_id: null,
    problem_id: null,
    price: null,
    shop_id: null,
    image: [],
    cart_id: null,
    user_id: null,
  };
  brandList: any[];
  deviceList: any[];
  issueList: any[];
  formSubmitted: boolean = false;
  expectedPrice: any = "";
  files: File[] = [];
  shop;
  addedDeviceProblemToDisplayInCart = {
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
  };
  estimatedRepairTime;
  constructor(
    private headerService: HeaderService,
    private uploadService: UploadService,
    private shopService: ShopService,
    private activeModal: NgbActiveModal,
    private storeTokenService: StoreTokenService
  ) {}

  ngOnInit(): void {
    this.shop = JSON.parse(localStorage.getItem("Shop"));
    this.bookRepair.shop_id = this.shop.id;
    this.getBrandList();
  }

  getBrandList() {
    this.deviceList = JSON.parse(localStorage.getItem("deviceList"));
  }

  // getDeviceList(event) {
  //   this.headerService.getDeviceList(event).subscribe(
  //     (data) => {
  //       console.log(data["data"]);
  //       this.deviceList = data["data"];
  //     },
  //     (error) => {}
  //   );
  // }

  getIssueList(event) {
    if (this.bookRepair.device_id && this.bookRepair.problem_id) {
      this.getExpectedPrice();
    }
    let obj = {
      device_id: event.target.value,
    };

    console.log(obj);
    this.headerService.getIssueListById(obj).subscribe(
      (data) => {
        this.issueList = data["data"];
      },
      (error) => {}
    );
  }

  getExpectedPrice() {
    console.log("gsdfy");
    console.log(this.shop);
    let getExpectedPrice = {
      device: this.bookRepair.device_id,
      problem: this.bookRepair.problem_id,
      shop_id: this.shop.id,
    };
    console.log(this.shop.id);
    console.log(getExpectedPrice);
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data["data"]);
        this.bookRepair.price = data["data"][0].TotalAmount;
        this.addedDeviceProblemToDisplayInCart.total_amount =
          data["data"][0].TotalAmount;
        this.addedDeviceProblemToDisplayInCart.ANOBaseFees =
          data["data"][0].ANOBaseFees;
        this.addedDeviceProblemToDisplayInCart.ANOCommissionFees =
          data["data"][0].ANOCommissionFees;
        this.addedDeviceProblemToDisplayInCart.price = data["data"][0].price;
        this.estimatedRepairTime = data["data"][0].estimatedRepaidTime;
        this.getTime();
      },
      (error) => {}
    );
  }
  getTime() {
    var hms = this.expectedPrice;
    var target = new Date("1970-01-01 " + hms);
    console.log(target.getUTCHours());
  }
  addDevice() {
    //check user is log in if log in then set user id
    this.bookRepair.user_id = JSON.parse(localStorage.getItem("user_id"));

    //set Cart_id if user is not log in
    this.bookRepair.cart_id = localStorage.getItem("cart_id");

    //set device name in display object
    this.deviceList.forEach((element) => {
      if (element.id == this.bookRepair.device_id) {
        this.addedDeviceProblemToDisplayInCart.deviceName = element.full_name;
        this.addedDeviceProblemToDisplayInCart.deviceId = element.id;
      }
    });

    //set problem name in display object
    this.issueList.forEach((element) => {
      if (element.id == this.bookRepair.problem_id) {
        this.addedDeviceProblemToDisplayInCart.problemName =
          element.problem.problemName;
        this.addedDeviceProblemToDisplayInCart.problemId = element.id;
      }
    });

    this.shopService.addCartData(this.bookRepair).subscribe(
      (data) => {
        console.log(data["data"]);
        localStorage.setItem("cart_id", data["data"].cart_id);
        this.addedDeviceProblemToDisplayInCart.id = data["data"].id;
      },
      (error) => {}
    );

    console.log(this.bookRepair.cart_id);
    console.log("obj", this.addedDeviceProblemToDisplayInCart);
    console.log(this.bookRepair);
    this.activeModal.close(this.addedDeviceProblemToDisplayInCart);
  }
  // onSelect(event) {
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  //   this.files.forEach((element) => {
  //     //this.upload(element);
  //     console.log(element);
  //   });
  // }
  // upload(file) {
  //   // const file = this.selectedFiles.item(0);
  //   console.log("upload file function called");
  //   let q = this.uploadService.uploadFile(file).subscribe((response) => {
  //     console.log(response);
  //   });
  //   console.log("From Calling", q);
  //   //this.uploadService.uploadfile(file);
  // }

  // onRemove(event) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }

  // getExpectedPrice() {
  //   this.expectedPrice = "";
  //   let obj = {
  //     device: this.bookRepair.device_id,
  //     brand: this.bookRepair.brand_id,
  //     problem: this.bookRepair.problem_id,
  //     shop_id: this.shopId,
  //   };
  //   this.bookRepair.shop_id = this.shopId;
  //   this.shopService.getExpectedPrice(obj).subscribe((data) => {
  //     data["data"].forEach((element) => {
  //       if (element.shop_id == this.shopId) {
  //         this.expectedPrice = element.TotalAmount;
  //       }
  //     });
  //   });
  // }
  // addToCart(addCart) {
  //   this.formSubmitted = true;
  //   if (addCart.valid) {
  //     this.bookRepair.price = this.expectedPrice;
  //     this.bookRepair.cart_id = this.storeTokenService.get("cart_id");
  //     console.log(addCart);
  //     console.log(this.bookRepair);
  //     this.shopService.addCartData(this.bookRepair).subscribe(
  //       (data) => {
  //         console.log(data["data"]);
  //         this.activeModal.close(data["data"]);
  //       },
  //       (error) => {}
  //     );
  //   } else {
  //     return;
  //   }
  // }
}
