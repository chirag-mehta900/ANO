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

  grandTotal: number = 0;
  grandTotalOfANOCommissionFees: number = 0;
  grandTotalOfBaseFees: number = 0;
  grandTotalOfPartsFees: number = 0;
  grandTotalOfShopCommissionFees: number = 0;

  order: any[] = [];
  shops: any;
  totaldevice: any;

  constructor(private Profile: ProfileService) {}

  ngOnInit() {
    var id = JSON.parse(localStorage.getItem('OneOrder') || '[]');
    this.Profile.getsingleOrder(id).subscribe(
      (response) => {
        console.log(response, 'response of single order');
        this.totaldevice = response['data']['order']['details'].length;
        this.order.push(response['data']['order']);

        this.grandTotal = response['data'].grandTotal;
        this.grandTotalOfANOCommissionFees =
          response['data'].grandTotalOfANOCommissionFees;
        this.grandTotalOfBaseFees = response['data'].grandTotalOfBaseFees;
        this.grandTotalOfPartsFees = response['data'].grandTotalOfPartsFees;
        this.grandTotalOfShopCommissionFees =
          response['data'].grandTotalOfShopCommissionFees;

        this.order.forEach((e) => {
          e.repairedDate = this.dateformat(e.repairedDate);
          e.shop.mobileNumber = this.convertmobile(e.shop.mobileNumber);
        });
        console.log(this.order, 'array');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  convertmobile(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')' + match[2] + '-' + match[3];
    }
    return null;
  }

  dateformat(data) {
    var year = data.slice(0, 4);
    var month = data.slice(5, 7);
    var day = data.slice(8, 10);

    return month + '-' + day + '-' + year;
  }
}
