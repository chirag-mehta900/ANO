import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signUpNameFlag: boolean = true;
  signUpMobileFlag: boolean = false;
  signUpConformationFlag: boolean = false;
  signUpEmailFlag: boolean = false;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  signUpNameComplete() {
    this.signUpNameFlag = false;
    this.signUpMobileFlag = true;
  }
  signUpMobilePrevious() {
    this.signUpNameFlag = true;
    this.signUpMobileFlag = false;
  }
  signUpMobileComplete() {
    this.signUpMobileFlag = false;
    this.signUpConformationFlag = true;
  }
  signUpConfirmationComplete() {
    this.signUpConformationFlag = false;
    this.signUpEmailFlag = true;
  }
  signUpEmailPrevious() {
    this.signUpConformationFlag = true;
    this.signUpEmailFlag = false;
  }
  signUpEmailComplete() {
    this.activeModal.close();
  }
}
