import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css'],
})
export class EditaddressComponent implements OnInit {
  Addaddress: FormGroup;
  editId;
  curruntAddress: any[] = [];

  constructor(
    public router: Router,
    private profile: ProfileService,
    private activeModal: NgbActiveModal
  ) {}

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
  }

  Cancel() {
    this.activeModal.close(null);
  }

  address() {
    console.log(this.Addaddress.value);

    if (this.Addaddress.valid) {
      this.profile.putAddressbyID(this.Addaddress.value, this.editId).subscribe(
        (response) => {
          console.log(response);
          console.log(response['data']);

          if (response['status'] == 200) {
            this.activeModal.close(response['data']);
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
