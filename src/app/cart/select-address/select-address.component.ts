import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css'],
})
export class SelectAddressComponent implements OnInit {
  Addressdata: any = [];
  tempObj: any = {};
  href: any;

  constructor(
    private profile: ProfileService,
    public router: Router,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href);

    this.profile.getAlladdress().subscribe((data) => {
      console.log(data);
      this.Addressdata = data['data'];
      console.log(this.Addressdata);
    });
  }

  editaddress(a) {
    console.log(a);
    // this.profile.getEditId(a.id);

    // this.router.navigate(['profile/edit']);
  }

  Save() {
    console.log(this.tempObj);
    this.activeModal.close(this.tempObj);
  }

  select(a) {
    this.tempObj = a;
    console.log(this.tempObj);
  }

  Addadress() {
    this.router.navigate(['profile/add-address']);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }

  changeaddress() {}

  close() {}
}
