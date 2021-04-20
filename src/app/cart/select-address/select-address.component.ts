import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css'],
})
export class SelectAddressComponent implements OnInit {
  address: any[] = [];
  Address: any;

  selectaddress = {
    adddress: null,
  };

  constructor(private profile: ProfileService) {}

  ngOnInit() {
    this.profile.getAlladdress().subscribe((data) => {
      console.log(data);
      this.address = data['data'];
      console.log(this.address);

      // this.address.forEach((e) => {
      //   if ((e.isDefault = 1)) {
      //     this.Address =
      //       e.addressLine + ' ' + e.city + ' ' + e.state + ' ' + e.zipCode;
      //   }
      // });
      // console.log(this.Address);
    });
  }

  changeaddress() {}

  close() {}
}
