import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { BookRepairComponent } from "./book-repair/book-repair.component";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreTokenService } from "src/@theme/Services/store-token.service";

@Component({
  selector: "app-header-module",
  templateUrl: "./header-module.component.html",
  styleUrls: ["./header-module.component.css"],
})
export class HeaderModuleComponent implements OnInit {
  userName: any;
  isopenDropdown:boolean = false
  isModalOpen: boolean = false;
  isCollapsed
  expandPanel
  isTablet

  isMobile
    constructor(
    private modalService: NgbModal,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private storeTokenService: StoreTokenService,
    public router: Router
  ) {
    this.formatDevice()
  }

  ngOnInit() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data["data"].name;
      },
      (error) => {}
    );
  }
  formatDevice() {
    this.expandPanel = this.isTablet = this.isMobile = this.isCollapsed=false;
    if (window.innerWidth >= 1024) {
      this.expandPanel = true;
      console.log("expand",this.expandPanel)
      this.isCollapsed=false
      console.log(this.isCollapsed)
    } else if (window.innerWidth >= 767 && window.innerWidth < 1024) {
      this.isTablet = true;
      console.log("tablet",this.isTablet)
      this.isCollapsed=true
    } else {
      this.isMobile = true;
      console.log("mobile",this.isMobile)
      this.isCollapsed=true
    }
    if (
      window.innerWidth > window.innerHeight &&
      window.innerWidth >= 640 &&
      (this.isMobile || this.isTablet)
    ) {
      this.isMobile = this.isTablet = false;
      this.isCollapsed=false
      this.expandPanel = true;
    }
  
  }
  openDropdown(){
    if(this.isopenDropdown){
      this.isopenDropdown=false
    }else{
    this.isopenDropdown = true}
  }

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
        this.userName = data["data"].name;
        this.storeTokenService.set("user_id", data["data"].id);
      },
      (error) => {}
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
    this.router.navigate(["home"]);
  }
  account(){
    this.router.navigate(['profile'])
  }
  cart(){
    this.router.navigate(['profile/service'])
  }
  onabout() {
    this.router.navigate(["about"]);
  }
  bookRepair() {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    const modalRef = this.modalService.open(BookRepairComponent);
  }
}
