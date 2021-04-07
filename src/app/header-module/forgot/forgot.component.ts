import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  msg: any;
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private headerService: HeaderService
  ) {}

  email: any;
  isError: boolean = false;
  changebutton = false;

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

  setEmail(event) {
    this.email = event;
  }

  login() {
    if (this.email === undefined || this.email === '') {
      this.isError = true;
    } else {
      const data = {
        email: this.email,
      };
      this.headerService.forgotpassword(data).subscribe(
        (response) => {
          console.log(response, 'forgot response');
          this.msg = response['message'];
          this.changebutton = true;
          // this.activeModal.close();
          // this.modalService.open(LoginComponent);
        },
        (error) => {
          console.log(error, 'Error');
          if (error['message'] === 'Undefined offset: 0') {
            this.isError = true;
          }
        }
      );
    }
  }

  gotologin() {
    this.activeModal.close();
    this.modalService.open(LoginComponent);
  }
}
