import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookRepairComponent } from '../header-module/book-repair/book-repair.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  selectedImg = [
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
    'http://placehold.it/350x150/000000',
  ];

  lat: any;
  lng: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location not found');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(this.lat, this.lng);
    });
  }

  bookRepair() {
    const modalRef = this.modalService.open(BookRepairComponent);
  }
}
