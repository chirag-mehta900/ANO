import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { ShopService } from "src/@theme/Services/shop.service";
import { UploadService } from "src/@theme/Services/upload.service";

@Component({
  selector: "app-addproduct",
  templateUrl: "./addproduct.component.html",
  styleUrls: ["./addproduct.component.css"],
})
export class AddproductComponent implements OnInit {
  @Input() shopId;
  bookRepair = {
    brand_id: null,
    device_id: null,
    problem_id: null,
    price: null,
    shop_id: null,
    image: [],
  };
  brandList: any[];
  deviceList: any[];
  issueList: any[];
  formSubmitted: boolean = false;
  expectedPrice: any = "";
  files: File[] = [];
  constructor(
    private headerService: HeaderService,
    private uploadService: UploadService,
    private shopService: ShopService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getBrandList();
  }

  getBrandList() {
    this.headerService.getBrandList().subscribe(
      (data) => {
        this.brandList = data["data"];
      },
      (error) => {}
    );
  }

  getDeviceList(event) {
    this.headerService.getDeviceList(event).subscribe(
      (data) => {
        this.deviceList = [data["data"]];
      },
      (error) => {}
    );
  }

  getIssueList(event) {
    this.headerService.getIssueListById(event).subscribe(
      (data) => {
        this.issueList = [data["data"]];
      },
      (error) => {}
    );
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

  getExpectedPrice() {
    let obj = {
      device: this.bookRepair.device_id,
      brand: this.bookRepair.brand_id,
      problem: this.bookRepair.problem_id,
      shop_id: this.shopId,
    };
    this.bookRepair.shop_id = this.shopId;
    this.shopService.getExpectedPrice(obj).subscribe((data) => {
      data["data"].forEach((element) => {
        if (element.shop_id == this.shopId) {
          this.expectedPrice = element.TotalAmount;
        }
      });
    });
  }
  addToCart(addCart) {
    this.formSubmitted = true;
    if (addCart.valid) {
      this.bookRepair.price = this.expectedPrice;
      console.log(addCart);
      console.log(this.bookRepair);
      this.shopService.addCartData(this.bookRepair).subscribe(
        (data) => {
          console.log(data["data"]);
          this.activeModal.close(data["data"]);
        },
        (error) => {}
      );
    } else {
      return;
    }
  }
}
