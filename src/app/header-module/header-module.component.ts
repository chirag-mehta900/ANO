import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HttpHeaders } from "@angular/common/http";
import { JwtTokenService } from "src/@theme/services/jwt-token.service";
import { StoreTokenService } from "src/@theme/Services/store-token.service";

@Component({
  selector: "app-header-module",
  templateUrl: "./header-module.component.html",
  styleUrls: ["./header-module.component.css"],
})
export class HeaderModuleComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  logIn() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      console.log(result);
      this.setUserName();
    });
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        console.log(data["data"]);
      },
      (error) => {}
    );
  }
  signUp() {
    const modalRef = this.modalService.open(SignupComponent);
  }
}
