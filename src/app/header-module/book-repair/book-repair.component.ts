import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

type ResponseType = {
  data: [
    {
      pricing: [];
    }
  ];
};

@Component({
  selector: 'app-book-repair',
  templateUrl: './book-repair.component.html',
  styleUrls: ['./book-repair.component.css'],
})
export class BookRepairComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  shopmarker: object = {};
  tempData: [] = [];
  Data: any[] = [];
  Marker: any[] = [];
  issues: any[] = [];

  Location = {
    lat: 0,
    lng: 0,
  };

  bookRepair = {
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
  danger1: boolean = false;
  danger2: boolean = false;

  lat;
  lng;
  constructor(
    private activeModal: NgbActiveModal,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.deviceList = JSON.parse(localStorage.getItem('deviceList') || '[]');

    if (!navigator.geolocation) {
    }
    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
    console.log(this.Location);

    this.getBrandList();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getBrandList() {
    if (this.deviceList.length == 0) {
      this.headerService.getBrandList().subscribe(
        (data) => {
          console.log(data);

          this.deviceList = data['data'];
          console.log(this.deviceList);
          localStorage.setItem('deviceList', JSON.stringify(this.deviceList));
        },
        (error) => {}
      );
    }
  }

  close() {
    this.activeModal.close();
  }

  // getDeviceList(event) {
  //   console.log(event);
  //   let obj = {
  //     device_id: event.target.value,
  //   };

  //   this.headerService.getIssueListById(obj).subscribe(
  //     (data) => {
  //       console.log(data);

  //       this.deviceList = data['data'];
  //     },
  //     (error) => {}
  //   );
  // }

  getIssueList(event) {
    console.log(event);

    if (event.target.value == null) {
      this.danger1 = true;
    } else {
      let obj = {
        device_id: event.target.value,
      };
      console.log(obj);
      this.headerService.getIssueListById(obj).subscribe(
        (data) => {
          console.log(data);

          this.issueList = data['data'];
        },
        (error) => {}
      );
    }
  }

  filter() {}

  goToBrand() {
    this.selectBrandFlag = true;
    this.selectDeviceFlag = false;
  }

  goToIssue() {
    this.selectDeviceFlag = false;
    this.selectIssueFlag = true;
  }

  goToDevice(event) {
    console.log(event);

    this.selectBrandFlag = false;
    this.selectDeviceFlag = true;
  }

  goToDeviceBack() {
    this.selectDeviceFlag = true;
    this.selectIssueFlag = false;
  }
  addRepair(Repair) {
    localStorage.removeItem('issues');
    console.log(this.bookRepair);
    this.issueList.forEach((e) => {
      var obj = {
        problemId: e.problem.id,
        problem: e.problem.problemName,
      };
      this.issues.push(obj);
    });
    localStorage.setItem('issues', JSON.stringify(this.issues));

    this.formSubmitted = true;
    if (Repair.valid) {
      this.bookRepair.distanceMile = 10;
      this.bookRepair.latitude = this.Location.lat;
      this.bookRepair.longitude = this.Location.lng;
      console.log(JSON.stringify(this.bookRepair));

      localStorage.setItem('deviceProblem', JSON.stringify(this.bookRepair));

      this.headerService.searchStore(this.bookRepair).subscribe(
        (response: ResponseType) => {
          console.log(response);

          response.data.forEach((e) => {
            if (e.pricing.length) {
              this.Data.push(e);
            }
          });
          console.log(this.Data);
          localStorage.removeItem('Shoplist');
          localStorage.setItem('Shoplist', JSON.stringify(this.Data));

          for (var i = 0; i < this.Data.length; i++) {
            // console.log(this.Data[i].pricing[0].price);
            this.shopmarker = {
              latitude: this.Data[i].latitude,
              longitude: this.Data[i].longitude,
              price: {
                text: '$' + '' + this.Data[i].pricing[0].price.toString(),
                color: 'white',
                fontWeight: '500',
                fontSize: '20px',
              },
              icon: {
                url:
                  'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/shop-marker.png?alt=media&token=8e0836c0-f669-4ec6-8ad2-215739b2d56e',
                scaledSize: {
                  width: 100,
                  height: 70,
                },
              },
            };

            this.Marker.push(this.shopmarker);
          }

          localStorage.setItem('shopmarker', JSON.stringify(this.Marker));

          console.log(this.Marker);
          this.activeModal.close();

          this.router.navigate([
            '/map',
            { storeData: JSON.stringify(response['data']) },
          ]);
        },
        (error) => {}
      );
    } else {
      return;
    }
  }
}
