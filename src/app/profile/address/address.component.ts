import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  Address: any;
  constructor(public router: Router, private profile: ProfileService) {}

  ngOnInit() {
    this.Address = JSON.parse(localStorage.getItem('UserAddress') || '[]');
    console.log(this.Address);
  }

  Addadress() {
    this.router.navigate(['profile/add-address']);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }
}
