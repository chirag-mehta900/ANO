import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { ChangePswComponent } from './change-psw/change-psw.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Details: any[] = [];
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private profile: ProfileService
  ) {}

  ngOnInit() {
    this.profile.getUserDetail().subscribe((data) => {
      console.log(data);
      this.Details.push(data['data']);
      console.log(this.Details);
    });
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
