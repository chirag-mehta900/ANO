import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit {
  Addaddress: FormGroup;
  editId;
  curruntAddress: any[] = [];

  constructor(public router: Router, private profile: ProfileService) {}

  ngOnInit() {
    this.profile.responseeditId.subscribe((id) => {
      console.log(id, 'new');
      this.editId = id;
    });

    this.profile.getAddressbyID(this.editId).subscribe((response) => {
      this.curruntAddress = response['data'];
      console.log(this.curruntAddress);
    });
    this.Addaddress = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      addressLine: new FormControl(null, Validators.required),
      landMark: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });

    // this.Addaddress.setValue({
    //   name: this.curruntAddress[0].name,
    //   phoneNumber: this.curruntAddress[0].phoneNumber,
    //   addressLine: this.curruntAddress[0].addressLine,
    //   landMark: this.curruntAddress[0].landMark,
    //   zipCode: this.curruntAddress[0].zipCode,
    //   city: this.curruntAddress[0].city,
    //   state: this.curruntAddress[0].state,
    // });
  }

  Cancel() {
    this.router.navigate(['profile/address']);
  }

  address() {
    console.log(this.Addaddress.value);

    if (this.Addaddress.valid) {
      this.profile.putAddressbyID(this.Addaddress.value, this.editId).subscribe(
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
