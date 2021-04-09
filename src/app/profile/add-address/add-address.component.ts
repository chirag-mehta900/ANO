import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  Cancel() {
    this.router.navigate(['profile/address']);
  }
}
