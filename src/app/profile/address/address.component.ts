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
    this.profile.getAlladdress().subscribe((data) => {
      console.log(data);
      this.Address = data['data'];
    });
    console.log(this.Address);
  }

  editaddress(a) {
    this.profile.getEditId(a.id);

    this.router.navigate(['profile/edit']);
  }

  Save() {
    this.router.navigate(['profile']);
  }
  makedefault(event) {
    var data: any;
    console.log(event);
    this.profile.makedefault(event, data).subscribe((data) => {
      console.log(data);
    });
  }
  Addadress() {
    this.router.navigate(['profile/add-address']);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }
}
