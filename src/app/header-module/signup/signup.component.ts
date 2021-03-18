import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  signUpForm: FormGroup;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        ),
      ]),
      password: new FormControl(null, Validators.required),
      role: new FormControl("user"),
    });
  }

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
