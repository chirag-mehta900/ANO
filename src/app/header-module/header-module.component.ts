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
  isModalOpen: boolean = false;
  constructor(
    private modalService: NgbModal,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private storeTokenService: StoreTokenService,
    public router: Router
  ) {}

  ngOnInit() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data["data"].name;
      },
      (error) => {}
    );
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
