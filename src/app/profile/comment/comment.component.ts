import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  rating3 = 3;
  rating0 = 0;

  order: any[] = [];
  shops: any;
  totaldevice: any;

  constructor(private Profile: ProfileService) {}

  ngOnInit() {
    var id = JSON.parse(localStorage.getItem('OneOrder') || '[]');
    this.Profile.getsingleOrder(id).subscribe((response) => {
      console.log(response, 'response of single order');
      this.totaldevice = response['data']['details'].length;
      this.order.push(response['data']);
      console.log(this.order, 'array');
    });
  }
}
