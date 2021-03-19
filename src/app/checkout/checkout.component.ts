import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isPaid:boolean=false
  constructor() { }

  ngOnInit(): void {
  }

  pay(){
    this.isPaid=true
  }
}
