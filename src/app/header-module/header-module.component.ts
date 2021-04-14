import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookRepairComponent } from './book-repair/book-repair.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { MapService } from 'src/@theme/Services/map.service';

@Component({
  selector: 'app-header-module',
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderModuleComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('userProfile') userProfile: ElementRef;
  @ViewChild('drop') drop: ElementRef;
  userName: any = '';
  isModalOpen: boolean = false;
  Location = {
    lat: null,
    lng: null,
  };
  area: any;
  area2: any;
  isMobile;
  constructor(
    private modalService: NgbModal,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private storeTokenService: StoreTokenService,
    public router: Router,
    private renderer: Renderer2,
    private _eref: ElementRef,
    private mapService: MapService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.toggleButton.nativeElement &&
        e.target !== this.menu.nativeElement
      ) {
        this.isMenuOpen = false;
      }
      if (
        e.target !== this.userProfile.nativeElement &&
        e.target !== this.drop.nativeElement
      ) {
        this.isopenDropdown = false;
      }
    });
  }
  isMenuOpen = false;
  isopenDropdown = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openDropdown() {
    this.isopenDropdown = !this.isopenDropdown;
  }

  onClick(event) {
    // for close dropdown on outside dropdown click
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isopenDropdown = false;
    }
  }
  ngOnInit() {
    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    this.mapService
      .getArea(this.Location.lat, this.Location.lng)
      .subscribe((data: any) => {
        this.area = data.results[0].formatted_address;
        this.area2 = this.area.slice(0, 35);
        localStorage.setItem('Address', JSON.stringify(this.area));

        console.log(this.area);
      });

    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data['data'].name;
      },
      (error) => { }
    );

    navigator.geolocation.getCurrentPosition((position) => {
      this.Location.lat = position.coords.latitude;
      this.Location.lng = position.coords.longitude;
      console.log(this.Location);

      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

      this.mapService
        .getArea(this.Location.lat, this.Location.lng)
        .subscribe((data: any) => {
          this.area = data.results[0].formatted_address;
          this.area2 = this.area.slice(0, 30);
          localStorage.setItem('Address', JSON.stringify(this.area));

          console.log(this.area);
        });
    });
  }
  // formatDevice() {
  //   this.expandPanel = this.isTablet = this.isMobile = this.isCollapsed=false;
  //   if (window.innerWidth >= 1024) {
  //     this.expandPanel = true;
  //     //document.getElementById("navUl").classList.remove("navbar-nav")
  //     console.log("expand",this.expandPanel)
  //     this.isCollapsed=false
  //     console.log(this.isCollapsed)
  //   } else if (window.innerWidth >= 767 && window.innerWidth < 1024) {
  //     this.isTablet = true;
  //     console.log("tablet",this.isTablet)
  //     this.isCollapsed=true
  //   } else {
  //     this.isMobile = true;
  //     console.log("mobile",this.isMobile)
  //     this.isCollapsed=true
  //   }
  //   if (
  //     window.innerWidth > window.innerHeight &&
  //     window.innerWidth >= 640 &&
  //     (this.isMobile || this.isTablet)
  //   ) {
  //     this.isMobile = this.isTablet = false;
  //     this.isCollapsed=false
  //     this.expandPanel = true;
  //   }

  // }

  logIn() {
    this.userName = null;
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      this.setUserName();
    });
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data['data'].name;
        this.storeTokenService.set('user_id', data['data'].id);
      },
      (error) => { }
    );
  }
  signUp() {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    const modalRef = this.modalService.open(SignupComponent);
    modalRef.result.then((result) => {
      this.userName = result;
    });
  }

  onhome() {
    this.router.navigate(['home']);
  }
  onContact() {
    this.router.navigate(['contact']);
  }

  nearby() {
    this.router.navigate(['getall']);
  }
  account() {
    this.router.navigate(['profile']);
    this.isopenDropdown = !this.isopenDropdown;
  }
  cart() {
    this.isopenDropdown = !this.isopenDropdown;

    this.router.navigate(['cart']);
  }
  service() {
    this.isopenDropdown = !this.isopenDropdown;

    this.router.navigate(['profile/service']);
  }
  onabout() {
    this.router.navigate(['about']);
  }
  bookRepair() {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    const modalRef = this.modalService.open(BookRepairComponent);
  }

  logout() {
    this.storeTokenService.remove('token');
    this.storeTokenService.remove('user_id');

    this.isopenDropdown = !this.isopenDropdown;
    this.userName = null;
    this.router.navigate(['home']);
  }
}
