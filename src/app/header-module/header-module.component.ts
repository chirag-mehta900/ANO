import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { BookRepairComponent } from "./book-repair/book-repair.component";

@Component({
  selector: "app-header-module",
  templateUrl: "./header-module.component.html",
  styleUrls: ["./header-module.component.css"],
})
export class HeaderModuleComponent implements OnInit {
  userName: any;
  constructor(
    private modalService: NgbModal,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  logIn() {
    this.userName = null;
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result) => {
      this.setUserName();
    });
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data["data"].name;
      },
      (error) => {}
    );
  }
  signUp() {
    const modalRef = this.modalService.open(SignupComponent);
    modalRef.result.then((result) => {
      this.userName = result;
    });
  }
  bookRepair() {
    const modalRef = this.modalService.open(BookRepairComponent);
  }
}
