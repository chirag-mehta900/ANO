import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { StoreTokenService } from "src/@theme/Services/store-token.service";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  nameSignUpFilled: boolean = false;
  signUpNameFlag: boolean = true;
  signUpMobileFlag: boolean = false;
  signUpConformationFlag: boolean = false;
  signUpEmailFlag: boolean = false;
  emailExist: boolean = false;
  signUpForm: FormGroup;
  userAddres: FormGroup;
  userName: any;
  email: any;
  mobile: any;
  formSubmitted: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private headerService: HeaderService,
    private storeTokenService: StoreTokenService,
    private modalService: NgbModal
  ) {}

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
      mobileNumber: new FormControl(null),
      password: new FormControl(null, Validators.required),
      role: new FormControl("user"),
    });
    this.userAddres = new FormGroup({
      email: new FormControl(null, Validators.required),
      birthDate: new FormControl(null),
      phoneNumber: new FormControl(null),
      addressLine: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      landMark: new FormControl(null),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
    });
  }

  checkEmail() {
    this.emailExist = false;
    let emailObj = {
      email: this.signUpForm.value.email,
    };
    this.headerService.checkEmail(emailObj).subscribe(
      (data) => {
        if (data["data"] == 1) {
          this.emailExist = true;
        }
      },
      (error) => {}
    );
  }

  signUpNameComplete() {
    this.nameSignUpFilled = true;
    if (
      this.signUpForm.value.name &&
      this.signUpForm.value.email &&
      this.signUpForm.value.password
    ) {
      this.signUpNameFlag = false;
      this.signUpMobileFlag = true;
    } else {
      return;
    }
  }

  openLogIn() {
    this.activeModal.close();
    this.modalService.open(LoginComponent);
  }

  signUpMobilePrevious() {
    this.signUpNameFlag = true;
    this.signUpMobileFlag = false;
  }
  signUpMobileComplete() {
    this.formSubmitted = true;
    if (this.signUpForm.valid) {
      this.email = this.signUpForm.value.email;
      this.mobile = this.signUpForm.value.mobileNumber;
      this.headerService.signUp(this.signUpForm.value).subscribe(
        (data) => {
          if (data["status"] == 200) {
            this.storeTokenService.set("token", data["data"].access_token);
            this.setUserName();
          }
        },
        (error) => {}
      );
      this.signUpMobileFlag = false;
      this.signUpConformationFlag = true;
    } else {
      return;
    }
  }
  signUpConfirmationComplete() {
    this.signUpConformationFlag = false;
    this.signUpEmailFlag = true;
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data["data"].name;
      },
      (error) => {}
    );
  }
  signUpEmailPrevious() {
    this.signUpConformationFlag = true;
    this.signUpEmailFlag = false;
  }
  signUpEmailComplete() {
    this.userAddres.value.email = this.email;
    this.userAddres.value.phoneNumber = this.mobile;
    this.headerService.userAddress(this.userAddres.value).subscribe(
      (data) => {
        this.activeModal.close(this.userName);
      },
      (error) => {}
    );
  }
}
