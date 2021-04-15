import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editprofile: FormGroup;
  Details: any;

  constructor(public router: Router, private profile: ProfileService) {}

  ngOnInit() {
    this.editprofile = new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
    });

    this.Details = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(this.Details);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }

  save() {
    console.log(this.editprofile.value.fname);
    console.log(this.editprofile.value.lname);

    this.profile.changeDetail(this.editprofile.value).subscribe(
      (response) => {
        console.log(response);
        if (response['status'] == 200) {
          this.router.navigate(['profile']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
