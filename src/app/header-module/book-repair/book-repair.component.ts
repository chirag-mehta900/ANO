import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";

@Component({
  selector: "app-book-repair",
  templateUrl: "./book-repair.component.html",
  styleUrls: ["./book-repair.component.css"],
})
export class BookRepairComponent implements OnInit {
  bookRepair = {
    brand: null,
    device: null,
    problem: null,
    latitude: null,
    longitude: null,
    distanceMile: null,
  };
  selectBrandFlag: boolean = true;
  selectDeviceFlag: boolean = false;
  selectIssueFlag: boolean = false;
  formSubmitted: boolean = false;
  selectedDeviceName: any;
  deviceList: any[] = [];
  issueList: any[] = [];
  brandList: [];
  isSelected: boolean = false;
  lat;
  lng;
  constructor(
    private activeModal: NgbActiveModal,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!navigator.geolocation) {
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
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
        console.log(data["data"]);
        this.deviceList = data["data"];
      },
      (error) => {}
    );
  }

  getIssueList(event) {
    this.deviceList.forEach((element: any) => {
      if (element.id == event) {
        this.selectedDeviceName = element.modelName;
      }
    });
    this.headerService.getIssueListById(event).subscribe(
      (data) => {
        this.issueList.push(data["data"]);
      },
      (error) => {}
    );
  }

  goToBrand() {
    this.selectBrandFlag = true;
    this.selectDeviceFlag = false;
  }

  goToIssue() {
    this.selectDeviceFlag = false;
    this.selectIssueFlag = true;
  }

  goToDevice() {
    this.selectBrandFlag = false;
    this.selectDeviceFlag = true;
  }

  goToDeviceBack() {
    this.selectDeviceFlag = true;
    this.selectIssueFlag = false;
  }
  addRepair(Repair) {
    this.formSubmitted = true;
    if (Repair.valid) {
      this.bookRepair.distanceMile = 10;
      this.bookRepair.latitude = this.lat;
      this.bookRepair.longitude = this.lng;
      this.headerService.searchStore(this.bookRepair).subscribe(
        (data) => {
          this.activeModal.close();
          this.router.navigate([
            "/map",
            { storeData: JSON.stringify(data["data"]) },
          ]);
        },
        (error) => {}
      );
    } else {
      return;
    }
  }
}
