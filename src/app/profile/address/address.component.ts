import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  Address: any;
  constructor(public router: Router, private profile: ProfileService,
    private modalService: NgbModal,) {}

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
    
    if(this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    const modalRef = this.modalService.open(ConfirmComponent);
    modalRef.componentInstance.addressId = event;
    modalRef.result.then((result) => {
      
    });
  }
  Addadress() {
    this.router.navigate(['profile/add-address']);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }
}
