import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
  sId: any;
  // Checkotp:any;
  counter: number = 59;
  emptyOtpFlag: boolean = false;
  validOtpFlag: boolean = false;
  resendOtpFlag: boolean = false;

  Resend = {
    mobileNumber: '',
  };
  verification = {
    email: '',
    mobileNumber: '',
  };

  confirmOTP = {
    mobileNumber: '',
    otp: null,
  };
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
      role: new FormControl('user'),
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
        if (data['data'] == 1) {
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

      localStorage.setItem('signUp', JSON.stringify(this.signUpForm.value));
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
    this.email = this.signUpForm.value.email;
    this.mobile = this.signUpForm.value.mobileNumber;

    console.log(this.signUpForm.value);

    localStorage.setItem('signUp', JSON.stringify(this.signUpForm.value));

    this.verification.email = this.signUpForm.value.email;
    this.verification.mobileNumber = this.signUpForm.value.mobileNumber;

    console.log(this.verification);

    this.headerService.generateOTP(this.verification).subscribe((response) => {
      console.log('get otp ', response);
      this.sId = response['data']['sId'];
    });

    this.signUpMobileFlag = false;
    this.signUpConformationFlag = true;

    if (this.signUpConformationFlag) {
      this.startCountdown(this.counter);
    } else {
      return;
    }
  }

  close() {
    this.activeModal.close();
  }

  resend() {
    if (this.resendOtpFlag) {
      this.Resend.mobileNumber = this.verification.mobileNumber;
      console.log(this.Resend);
      this.counter = 59;
      this.startCountdown(this.counter);

      this.headerService.resend(this.Resend).subscribe((response) => {
        if (response['status']) {
          console.log('resend otp', response);
        }
      });
    } else {
      console.log('wait for a while');
    }
  }
  startCountdown(seconds) {
    this.counter = seconds;

    const interval = setInterval(() => {
      console.log(this.counter);
      this.counter--;

      if (this.counter < 1) {
        clearInterval(interval);

        this.resendOtpFlag = true;
      }
    }, 1000);
  }

  // checkotp(otp){

  //   this.Checkotp = otp
  // }

  signUpConfirmationComplete(otp: any) {
    console.log(otp);

    this.confirmOTP.mobileNumber = this.verification.mobileNumber;
    this.confirmOTP.otp = otp;

    console.log(this.confirmOTP.otp.length);

    if (this.confirmOTP.otp.length < 4) {
      if (this.confirmOTP.otp.length == 0) {
        this.emptyOtpFlag = true;
        this.validOtpFlag = false;
      } else {
        this.emptyOtpFlag = false;
        this.validOtpFlag = true;
      }
    } else {
      this.headerService.verifyOTP(this.confirmOTP).subscribe((response) => {
        console.log('verify', response);

        if (response['status'] == 200) {
          this.signUpConformationFlag = false;
          this.signUpEmailFlag = true;
        }
      });
    }
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data['data'].name;
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

    console.log(this.signUpForm.value);

    this.headerService.signUp(this.signUpForm.value).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] == 200) {
          this.storeTokenService.set('token', data['data'].access_token);
          this.setUserName();

          console.log(this.userAddres.value);
          this.headerService.userAddress(this.userAddres.value).subscribe(
            (data) => {
              console.log(data);

              this.activeModal.close(this.userName);
            },
            (error) => {}
          );
        }
      },
      (error) => {}
    );
  }
}
