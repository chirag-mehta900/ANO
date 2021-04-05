import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CommonService } from 'src/@theme/Services/common.service';
import { HeaderService } from 'src/@theme/Services/header.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { ActivatedRoute } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { ShopService } from 'src/@theme/Services/shop.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        lineHeight: '50px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  isPaid: boolean = false;
  CardInfo: FormGroup;
  productdetail = [
    {
      problem: null,
    },
  ];
  productDetail: any[] = [];
  Email: any;
  CARD: any;
  Expiry: any;
  total: any;
  Card: object = {};
  Payment: object = {};
  prolist: any[] = [];
  custID: any;
  cardID: any;
  clientSecret: any;
  paymentID: any;
  payresponse: any;
  ID: any;
  orderDetails;
  shopDetails;
  productDisplay: any[] = [];
  detail: any[] = [];

  constructor(
    private header: HeaderService,
    private common: CommonService,
    private STRIPE: StripeService,
    private shopService: ShopService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {
    window['angularComponentReference'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: (data) => this.payapi(data),
    };
    // window['angularComponent'] = {
    //   component: this,
    //   zone: this.ngZone,
    //   loadAngular: (data) => this.payapis(data),
    // };
  }

  ngOnInit() {
    this.header.getEmail().subscribe(
      (data) => {
        this.Email = data['data'].email;
      },
      (error) => {}
    );

    this.prolist = JSON.parse(localStorage.getItem('issues') || '[]');
    console.log(this.prolist);
    this.getData();
    this.getOrderAndShopData();
    this.setProductToDisplay();

    this.total = Math.round(this.orderDetails.Total_Price);
  }

  getOrderAndShopData() {
    this.orderDetails = JSON.parse(localStorage.getItem('PlaceOrder'));
    this.shopDetails = JSON.parse(localStorage.getItem('Shop'));
    // console.log(this.shopDetails);
  }

  setProductToDisplay() {
    this.orderDetails.details.forEach((element) => {
      let obj = {
        device_id: element.device_id,
      };
      this.header.getIssueListById(obj).subscribe((data) => {
        data['data'].forEach((element1) => {
          if (element.problem_id == element1.problem.id) {
            this.productDisplay.push({
              problem_name: element1.problem.problemName,
              price: element.price,
              images: element.image,
            });
          }
        });
      });
    });
    // console.log(this.productDisplay);

    let id = this.route.snapshot.params.id;
    this.shopService.getOrder(id).subscribe((data) => {
      console.log(data);

      console.log(data['data'].shop, 'orderby id shop details');
      this.shopDetails = data['data'].shop;
      this.orderDetails = data['data'];
      this.detail = data['data'].details;
      console.log(this.orderDetails);
      console.log(this.detail);

      console.log(data['data'], 'orderby id order details');
    });

    for (var i = 0; i < this.detail.length; i++) {
      for (var j = 0; j < this.prolist.length; j++) {
        if (this.prolist[j].problemId == this.detail[i].problem_id) {
        }
      }
      console.log(this.productDetail, 'display');
      console.log(this.detail);
    }
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

  payapi(data) {
    this.common.pay(data).subscribe((paymentData) => {
      console.log(paymentData);
      this.clientSecret = paymentData['clientSecret'];
      console.log(this.clientSecret);

      if (paymentData['requiresAction']) {
        // Request authentication
        this.handleAction(paymentData['clientSecret']);
      } else if (paymentData['error']) {
        console.log(paymentData['error']);

        // showError(paymentData['error']);
      } else {
        this.orderComplete(paymentData['clientSecret']);
        console.log('order Complete');
        this.isPaid = true;
      }
    });
  }

  // payapis(data) {
  //   this.common.pay(data).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
  pay() {
    var orderData = {
      currency: 'usd',
      paymentMethodId: '',
      amount: this.total * 100,
      paymentIntentId: '',
    };

    var cardholderName = this.CardInfo.value.cardholdername;
    var data = {
      billing_details: {},
    };

    if (cardholderName) {
      data['billing_details']['name'] = cardholderName;
    }

    this.STRIPE.createPaymentMethod({
      type: 'card',
      card: this.card.element,
      billing_details: {
        name: cardholderName,
      },
    }).subscribe((result) => {
      if (result.error) {
        showError(result.error.message);
        console.log(result.error);
      } else {
        orderData.paymentMethodId = result.paymentMethod.id;

        console.log(result);
        console.log(orderData);

        window['angularComponentReference'].loadAngularFunction(orderData);
      }
    });

    var showError = function (errorMsgText) {
      var errorMsg = document.querySelector('.sr-field-error');
      console.log(errorMsg);

      errorMsg.textContent = errorMsgText;
      setTimeout(function () {
        errorMsg.textContent = '';
      }, 4000);
    };
    // let inter = setInterval(() => {
    //   if (this.clientSecret !== undefined) {
    //     clearInterval(inter);
    //   }
    // }, 10);

    // .then(function (paymentData) {
    //   if (paymentData.requiresAction) {
    //     this.handleAction(paymentData.clientSecret);
    //     // Request authentication
    //     console.log(paymentData.clientSecret);
    //   } else if (paymentData.error) {
    //     showError(paymentData.error);
    //   } else {
    //     console.log(paymentData.clientSecret);
    //   }
    // });

    //   this.detail = {
    //     email: this.Email,
    //     first_name: '',
    //     last_name: '',
    //   };
    //   this.common.userUrl(this.detail).subscribe(
    //     (response) => {
    //       let inter = setInterval(() => {
    //         let info: any[] = [response];
    //         this.custID = info[0].id;
    //         if (this.custID != undefined) {
    //           console.log(info);
    //           clearInterval(inter);
    //         }
    //         this.card();
    //       }, 100);
    //     },
    //     (error) => {}
    //   );
    // }

    // card() {
    //   this.CardInfo.value.exp_month = this.Expiry.slice(0, 2);
    //   this.CardInfo.value.exp_year = this.Expiry.slice(3, 5);

    //   this.Card = {
    //     user_id: this.custID,
    //     card_number: this.CardInfo.value.card_number,
    //     exp_month: this.CardInfo.value.exp_month,
    //     exp_year: this.CardInfo.value.exp_year,
    //     cvc: this.CardInfo.value.cvc,
    //   };

    //   this.common.cardUrl(this.Card).subscribe(
    //     (response) => {
    //       let inter = setInterval(() => {
    //         let cardinfo: any[] = [response];
    //         this.cardID = cardinfo[0].id;
    //         if (this.cardID != undefined) {
    //           console.log(cardinfo);
    //           clearInterval(inter);
    //         }
    //         // this.payment();
    //       }, 100);
    //     },
    //     (error) => {}
    //   );
    // }

    // payment() {
    //   this.Payment = {
    //     amount: this.total * 100,
    //     currency: 'usd',
    //     user_id: this.custID,
    //     source_id: this.cardID,
    //     receipt_email: this.Email,
    //   };

    //   this.common.paymentsUrl(this.Payment).subscribe(
    //     (response) => {
    //       let inter = setInterval(() => {
    //         let paymentinfo: any[] = [response];
    //         this.paymentID = paymentinfo[0].id;
    //         if (this.paymentID != undefined) {
    //           console.log(paymentinfo);
    //           clearInterval(inter);
    //         }
    //         this.isPaid = true;
    //       }, 100);
    //     },
    //     (error) => {}
    //   );
  }

  showError = function (errorMsgText) {
    var errorMsg = document.querySelector('.sr-field-error');
    console.log(errorMsg);

    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
      errorMsg.textContent = '';
    }, 4000);
  };

  handleAction(Data) {
    this.STRIPE.handleCardAction(Data).subscribe((data) => {
      console.log(data);

      if (data.error) {
        console.log(data.error);

        // showError('Your card was not authenticated, please try again');
      } else if (data.paymentIntent.status === 'requires_confirmation') {
        var obj = { paymentIntentId: data.paymentIntent.id };
        window['angularComponent']
          .loadAngularFunctions(obj)
          .then(function (result) {
            return result.json();
          })
          .then(function (json) {
            if (json.error) {
              // showError(json.error);
              console.log(json);
            } else {
              console.log('Done');

              // orderComplete(clientSecret);
            }
          });
      }
    });
  }

  orderComplete(Data) {
    this.STRIPE.retrievePaymentIntent(Data).subscribe((result) => {
      var paymentIntent = result.paymentIntent;
      var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
      // document.querySelectorAll(".payment-view").forEach(function (view) {
      //   view.classList.add("hidden");
      // });
      // document.querySelectorAll(".completed-view").forEach(function (view) {
      //   view.classList.remove("hidden");
      // });
      // document.querySelector(".order-status").textContent =
      //   paymentIntent.status === "succeeded" ? "succeeded" : "failed";
      // document.querySelector("pre").textContent = paymentIntentJson;

      console.log(paymentIntentJson);
    });
  }
}
