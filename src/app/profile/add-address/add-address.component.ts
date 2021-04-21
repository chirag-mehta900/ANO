import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  Addaddress: FormGroup;

  nameflag: boolean = false;
  phoneNumberflag: boolean = false;
  addressLineflag: boolean = false;
  landMarkflag: boolean = false;
  zipCodeflag: boolean = false;
  cityflag: boolean = false;
  stateflag: boolean = false;

  constructor(public router: Router, private profile: ProfileService) {}

  ngOnInit() {
    this.Addaddress = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      addressLine: new FormControl(null, Validators.required),
      landMark: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });
  }

  Cancel() {
    this.router.navigate(['profile/address']);
  }

  address() {
    this.nameflag = false;
    this.phoneNumberflag = false;
    this.addressLineflag = false;
    this.landMarkflag = false;
    this.zipCodeflag = false;
    this.cityflag = false;
    this.stateflag = false;

    if (
      this.Addaddress.value.name == null ||
      this.Addaddress.value.phoneNumber == null ||
      this.Addaddress.value.addressLine == null ||
      this.Addaddress.value.landMark == null ||
      this.Addaddress.value.zipCode == null ||
      this.Addaddress.value.city == null ||
      this.Addaddress.value.state == null
    ) {
      if (this.Addaddress.value.name == null) {
        this.nameflag = true;
      }

      if (this.Addaddress.value.phoneNumber == null) {
        this.phoneNumberflag = true;
      }

      if (this.Addaddress.value.addressLine == null) {
        this.addressLineflag = true;
      }

      if (this.Addaddress.value.landMark == null) {
        this.landMarkflag = true;
      }

      if (this.Addaddress.value.zipCode == null) {
        this.zipCodeflag = true;
      }

      if (this.Addaddress.value.city == null) {
        this.cityflag = true;
      }
      if (this.Addaddress.value.state == null) {
        this.stateflag = true;
      }
    }

    console.log(this.Addaddress.value);

    if (this.Addaddress.valid) {
      this.profile.addAddress(this.Addaddress.value).subscribe(
        (response) => {
          console.log(response);
          if (response['status'] == 200) {
            this.router.navigate(['profile/address']);
          }
        },
        (error) => {
          console.log(error);
        }
      ),
        (error) => {
          console.log(error);
        };
    } else {
      console.log('not update');
    }
  }
}
