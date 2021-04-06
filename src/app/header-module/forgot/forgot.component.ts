import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

  login() {
    this.activeModal.close();
    this.modalService.open(LoginComponent);
  }
}
