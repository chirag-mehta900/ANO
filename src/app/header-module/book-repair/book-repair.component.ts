import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

declare var gtag;

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
  deviceFlag: boolean = false;
  problemFlag: boolean = false;

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
  href: any;

  lat;
  lng;
  constructor(
    private activeModal: NgbActiveModal,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.href = this.router.url;

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
        (error) => {
          console.log(error);
        }
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
    let obj = {
      device_id: this.bookRepair.device,
    };
    console.log(obj);

    this.deviceList.forEach((e) => {
      if (e.id == this.bookRepair.device) {
        var dname = e.full_name;
        console.log(dname);

        gtag('event', 'Proceed_BUTTON_CLICKED', {
          event_category: 'BUTTON_CLICK',
          event_label: 'Track Me Click',
          value: 'User visit BookRepair for device' + dname,
        });
      }
    });
    this.headerService.getIssueListById(obj).subscribe(
      (data) => {
        console.log(data);

        this.issueList = data['data'];
      },
      (error) => {
        console.log(error);
      }
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
    this.deviceFlag = false;

    if (this.bookRepair.device) {
      this.selectBrandFlag = false;
      this.selectDeviceFlag = true;
    } else {
      this.deviceFlag = true;
    }
  }
  nearby() {
    this.router.navigate(['filterShop']);
    this.activeModal.close();
  }
  goToDeviceBack() {
    this.selectDeviceFlag = true;
    this.selectIssueFlag = false;
  }
  addRepair(Repair) {
    this.problemFlag = false;
    if (this.bookRepair.problem) {
      localStorage.removeItem('issues');
      console.log(this.bookRepair);
      this.issueList.forEach((e) => {
        if (e.problem.id == this.bookRepair.problem) {
          var pname = e.problem.problemName;
          console.log(pname);

          gtag('event', 'Proceed_BUTTON_CLICKED', {
            event_category: 'BUTTON_CLICK',
            event_label: 'Track Me Click',
            value: 'User visit BookRepair for this issue' + pname,
          });
        }

        var obj = {
          problemId: e.problem.id,
          problem: e.problem.problemName,
        };
        this.issues.push(obj);
      });
      localStorage.setItem('issues', JSON.stringify(this.issues));

      this.formSubmitted = true;
      if (Repair.valid) {
        this.bookRepair.distanceMile = 30;
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

            this.Data.forEach((element) => {
              console.log(element);
              if (element.average_rating != 0)
                element.average_rating = Math.round(element.average_rating);
              console.log(element.average_rating);
            });
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
            if (this.href.search('map') === -1) {
              this.activeModal.close();

              this.router.navigate(['/map']);
            } else {
              window.location.reload();
            }
          },

          (error) => {
            console.log(error);
          }
        );
      } else {
        return;
      }
    } else {
      this.problemFlag = true;
    }
  }

  other(event) {
    console.log(event);

    console.log('click on onthe option');
  }
}
