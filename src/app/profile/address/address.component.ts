import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  Addadress() {
    this.router.navigate(['profile/add-address']);
  }

  Cancel() {
    this.router.navigate(['profile']);
  }
}
