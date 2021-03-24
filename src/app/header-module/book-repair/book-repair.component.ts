import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';

@Component({
  selector: 'app-book-repair',
  templateUrl: './book-repair.component.html',
  styleUrls: ['./book-repair.component.css'],
})
export class BookRepairComponent implements OnInit {
  shopmarker: object = {};
  Data: any[] = [];
  Marker: any[] = [];

  Location = {
    lat: 0,
    lng: 0,
  };
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
    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    console.log(this.Location);

    this.getBrandList();
  }
  getBrandList() {
    this.headerService.getBrandList().subscribe(
      (data) => {
        this.brandList = data['data'];
      },
      (error) => {}
    );
  }

  getDeviceList(event) {
    this.headerService.getDeviceList(event).subscribe(
      (data) => {
        this.deviceList.push(data['data']);
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
        this.issueList.push(data['data']);
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
      this.bookRepair.distanceMile = 15;
      this.bookRepair.latitude = this.Location.lat;
      this.bookRepair.longitude = this.Location.lng;
      this.headerService.searchStore(this.bookRepair).subscribe(
        (data) => {
          console.log(data);
          this.Data.push(data);
          for (var i = 0; i < this.Data.length; i++) {
            for (var j = 0; j < this.Data[i].data.length; j++) {
              this.shopmarker = {
                latitude: this.Data[i].data[j].latitude,
                longitude: this.Data[i].data[j].longitude,
                // price: this.Data[i].data[j].pricing[0].price,
              };

              this.Marker.push(this.shopmarker);
            }
          }
          localStorage.setItem('shopmarker', JSON.stringify(this.Marker));

          console.log(this.Marker);

          this.router.navigate([
            '/map',
            { storeData: JSON.stringify(data['data']) },
          ]);
          this.activeModal.close();
        },
        (error) => {}
      );
    } else {
      return;
    }
  }
}
