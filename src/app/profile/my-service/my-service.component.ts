import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewComponent } from './add-review/add-review.component';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css'],
})
export class MyServiceComponent implements OnInit {
  rating3 = 3;
  rating0 = 0;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  addreview() {
    this.modalService.open(AddReviewComponent);
  }
}
