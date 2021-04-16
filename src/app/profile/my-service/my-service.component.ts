import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  shops: any;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private profile: ProfileService
  ) {}

  ngOnInit() {
    this.profile.getOrderlist().subscribe((data) => {
      console.log(data['data']);

      this.orderList = data['data'];
      // localStorage.setItem('orderList', JSON.stringify(this.orderList));
    });

    // this.orderList = JSON.parse(localStorage.getItem('orderList') || '[]');
    // console.log(this.orderList);
  }

  oneOrder(id) {
    console.log(id);
    localStorage.removeItem('OneOrder');
    localStorage.setItem('OneOrder', JSON.stringify(id));
    this.router.navigate(['profile/comment']);
  }

  addreview(order) {
    console.log(order);
    const modalref = this.modalService.open(AddReviewComponent);
    modalref.componentInstance.orderid = order.id;
    modalref.componentInstance.shopid = order.shop_id[0].id;
  }
}
