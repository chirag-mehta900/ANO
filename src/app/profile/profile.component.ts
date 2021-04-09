import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePswComponent } from './change-psw/change-psw.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Details: any;
  constructor(private modalService: NgbModal, public router: Router) {}

  ngOnInit() {
    this.Details = JSON.parse(localStorage.getItem('users') || '[]');
  }

  Changepsw() {
    this.modalService.open(ChangePswComponent);
  }

  editName() {
    this.router.navigate(['profile/edit-user']);
  }

  checkAddress() {
    this.router.navigate(['profile/address']);
  }

  checkOrder() {
    this.router.navigate(['profile/service']);
  }
}
