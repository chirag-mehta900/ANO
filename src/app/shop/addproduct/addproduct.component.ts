import { Component, Input, OnInit } from "@angular/core";
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
    brand: null,
    device: null,
    problem: null,
    shop_id: null,
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
    private shopService: ShopService
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
    this.bookRepair.shop_id = this.shopId;
    this.shopService.getExpectedPrice(this.bookRepair).subscribe((data) => {
      data["data"].forEach((element) => {
        if (element.shop_id == this.shopId) {
          this.expectedPrice = element.TotalAmount;
        }
      });
    });
  }
}
