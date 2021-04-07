import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/@theme/Services/profile.service';
import { AddReviewComponent } from './add-review/add-review.component';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css'],
})
export class MyServiceComponent implements OnInit {
  rating3 = 3;
  rating0 = 0;
  orderList: any[] = [];
  shops: any[] = [];

  constructor(
    private modalService: NgbModal,
    private profile: ProfileService
  ) {}

  ngOnInit() {
    this.orderList = JSON.parse(localStorage.getItem('orderList') || '[]');
    console.log(this.orderList);

    this.orderList.forEach((e) => {
      e.shop[e.shop];
      // this.shops.push(e.shop);
    });
    console.log(this.orderList);
  }

  addreview() {
    this.modalService.open(AddReviewComponent);
  }
}
