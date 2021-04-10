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
