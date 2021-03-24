import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/@theme/Services/common.service';
import { HeaderService } from 'src/@theme/Services/header.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  isPaid: boolean = false;
  CardInfo: FormGroup;
  Email: any;
  CARD: any;
  Expiry: any;
  total: any = 10.34;
  detail: object = {};
  Card: object = {};
  Payment: object = {};
  custID: any;
  cardID: any;
  paymentID: any;
  ID: any;

  constructor(private header: HeaderService, private common: CommonService) {}

  ngOnInit() {
    this.header.getEmail().subscribe(
      (data) => {
        this.Email = data['data'].email;
      },
      (error) => {}
    );
    this.getData();
  }

  getData() {
    this.CardInfo = new FormGroup({
      card_number: new FormControl(null, Validators.required),
      exp_month: new FormControl(null, Validators.required),
      exp_year: new FormControl(null, Validators.required),
      cardholdername: new FormControl(null, Validators.required),
      cvc: new FormControl(null, Validators.required),
      zip: new FormControl(null, Validators.required),
    });
  }

  cardnum(card: string) {
    this.CARD = card.split(' ').join('');
    if (this.CARD.length >= 3) {
      this.CARD = this.CARD.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
  }

  expiry(exp: any) {
    this.Expiry = exp.split(' ').join('');
    if (this.Expiry.length > 2) {
      this.Expiry = this.Expiry.match(new RegExp('.{1,2}', 'g')).join(' ');
      // this.Expiry = this.Expiry.replace(' ', '/');
    }
  }

  pay() {
    this.detail = {
      email: this.Email,
      first_name: '',
      last_name: '',
    };
    this.common.userUrl(this.detail).subscribe(
      (response) => {
        let inter = setInterval(() => {
          let info: any[] = [response];
          this.custID = info[0].id;
          if (this.custID != undefined) {
            console.log(info);
            clearInterval(inter);
          }
          this.card();
        }, 100);
      },
      (error) => {}
    );
  }

  card() {
    this.CardInfo.value.exp_month = this.Expiry.slice(0, 2);
    this.CardInfo.value.exp_year = this.Expiry.slice(3, 5);

    this.Card = {
      user_id: this.custID,
      card_number: this.CardInfo.value.card_number,
      exp_month: this.CardInfo.value.exp_month,
      exp_year: this.CardInfo.value.exp_year,
      cvc: this.CardInfo.value.cvc,
    };

    this.common.cardUrl(this.Card).subscribe(
      (response) => {
        let inter = setInterval(() => {
          let cardinfo: any[] = [response];
          this.cardID = cardinfo[0].id;
          if (this.cardID != undefined) {
            console.log(cardinfo);
            clearInterval(inter);
          }
          this.payment();
        }, 100);
      },
      (error) => {}
    );
  }

  payment() {
    this.Payment = {
      amount: this.total * 100,
      currency: 'usd',
      user_id: this.custID,
      source_id: this.cardID,
      receipt_email: this.Email,
    };

    this.common.paymentsUrl(this.Payment).subscribe(
      (response) => {
        let inter = setInterval(() => {
          let paymentinfo: any[] = [response];
          this.paymentID = paymentinfo[0].id;
          if (this.paymentID != undefined) {
            console.log(paymentinfo);
            clearInterval(inter);
          }
          this.isPaid = true;
        }, 100);
      },
      (error) => {}
    );
  }
}
