import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { JwtTokenService } from 'src/@theme/services/jwt-token.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { SignupComponent } from '../signup/signup.component';
import { ForgotComponent } from '../forgot/forgot.component';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;
  formSubmitted: boolean = false;
  orderList = [];
  userdetail: any;
  disableButton: boolean = false;
  invalidUserLog: boolean = false;
  userName: any;
  constructor(
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router,
    private jwtToken: JwtTokenService,
    private storeTokenService: StoreTokenService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loginInfo = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        ),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  close() {
    this.activeModal.close();
  }

  signUp() {
    this.activeModal.close();
    this.modalService.open(SignupComponent);
  }

  forgot() {
    this.activeModal.close();
    this.modalService.open(ForgotComponent);
  }
  logIn() {
    this.formSubmitted = true;
    this.disableButton = true;
    this.invalidUserLog = false;
    if (this.loginInfo.valid) {
      this.headerService.logIn(this.loginInfo.value).subscribe(
        (data) => {
          if (data['status'] == 200) {
            console.log(data);

            this.storeTokenService.set('token', data['data'].access_token);
            this.setUserName();
            this.activeModal.close(data['data'].access_token);
            this.userdetail = data['data'].userDetails;
            console.log(this.userdetail);

            localStorage.setItem('users', JSON.stringify(this.userdetail));
          }
          this.disableButton = false;
        },
        (error) => {
          this.invalidUserLog = true;
          this.disableButton = false;
        }
      );
    } else {
      this.invalidUserLog = false;
      this.disableButton = false;
      return;
    }
  }
  setUserName() {
    this.headerService.getUserName().subscribe(
      (data) => {
        this.userName = data['data'].name;
        this.storeTokenService.set('user_id', data['data'].id);
      },
      (error) => {}
    );

    this.profile.getOrderlist().subscribe((data) => {
      console.log(data['data']);

      this.orderList = data['data'];
      localStorage.setItem('orderList', JSON.stringify(this.orderList));
    });

    this.profile.getAlladdress().subscribe((data) => {
      console.log(data['data']);
      localStorage.setItem('UserAddress', JSON.stringify(data['data']));
    });
  }
}
