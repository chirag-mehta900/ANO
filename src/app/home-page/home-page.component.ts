import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/@theme/Services/common.service';
import { HeaderService } from 'src/@theme/Services/header.service';
import { BookRepairComponent } from '../header-module/book-repair/book-repair.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  Data: any[] = [];
  slider: any[] = [];
  display: any[] = [];

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

  Location = {
    lat: 0,
    lng: 0,
    Icon: {
      url:
        'https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247',
      scaledSize: {
        width: 200,
        height: 100,
      },
    },
  };
  constructor(
    private modalService: NgbModal,
    private header: HeaderService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.setItem('Location', JSON.stringify(this.Location));

    if (!navigator.geolocation) {
      console.log('location not found');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.Location.lat = position.coords.latitude;
      this.Location.lng = position.coords.longitude;
      console.log(this.Location);

      localStorage.setItem('Location', JSON.stringify(this.Location));
      this.Location = JSON.parse(localStorage.getItem('Location') || '[]');
      this.lat = this.Location.lat;
      this.lng = this.Location.lng;
    });

    this.Location = JSON.parse(localStorage.getItem('Location') || '[]');

    if (this.Location.lat == 0 && this.Location.lng == 0) {
      this.Location.lat = 21.27;
      this.Location.lng = 72.958;

      this.lat = this.Location.lat;
      this.lng = this.Location.lng;
    }

    localStorage.setItem('Location', JSON.stringify(this.Location));

    this.header.slider().subscribe((data) => {
      // this.Data.push(data);
      this.slider = data['data'];

      // this.slider.push(this.Data[0].data);
      console.log(this.slider);
      this.display.push(this.slider[0]);
    });
  }

  bookRepair() {
    const modalRef = this.modalService.open(BookRepairComponent);
  }

  call() {
    const modalRef = this.modalService.open(BookRepairComponent);
    this.router.navigate(['']);
  }
  OnChange(obj: any) {
    this.display.pop();
    console.log(obj);
    this.display.push(obj);
  }
}
