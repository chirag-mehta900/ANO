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
  shops: any;

  constructor(
    private modalService: NgbModal,
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

  addreview(order) {
    console.log(order[0].id);

    const modalref = this.modalService.open(AddReviewComponent);
    modalref.componentInstance.shopid = order[0].id;
  }
}
