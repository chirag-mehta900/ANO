import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from 'src/@theme/Services/shop.service';

@Component({
  selector: 'app-cartconflict',
  templateUrl: './cartconflict.component.html',
  styleUrls: ['./cartconflict.component.css'],
})
export class CartconflictComponent implements OnInit {
  shopName1: any;
  shopName2: any;
  shop: any;
  emptyselect: boolean = false;
  Oldselect: boolean = false;
  Newselect: boolean = false;

  constructor(
    private shopService: ShopService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    var obj = {
      user_id: JSON.parse(localStorage.getItem('user_id') || '[]'),
    };
    console.log(obj);

    this.shopService.getShopifromcart(obj).subscribe((data) => {
      console.log(data);
      console.log(data['data']['data'][0]['shopName']);

      this.shopName1 = data['data']['data'][0]['shopName'];

      (this.shop = JSON.parse(localStorage.getItem('Shop') || '[]')),
        (this.shopName2 = this.shop.shopName);
    });
  }

  oldcart(event) {
    console.log('1', event);

    if (event == 'oldcart') {
      this.Oldselect = true;
      this.Newselect = false;
    }
  }

  newcart(event) {
    console.log('2', event);

    if (event == 'newcart') {
      this.Oldselect = false;
      this.Newselect = true;
    }
  }

  submit() {
    this.emptyselect = false;
    if (this.Oldselect == false && this.Newselect == false) {
      this.emptyselect = true;
    } else {
      console.log('perfect');
      console.log(this.Newselect);
      console.log(this.Oldselect);

      var obj = {
        new: this.Newselect,
        old: this.Oldselect,
      };

      this.activeModal.close(obj);
    }
  }
}
