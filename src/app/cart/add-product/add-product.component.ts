import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/@theme/Services/header.service';
import { ShopService } from 'src/@theme/Services/shop.service';
import { StoreTokenService } from 'src/@theme/Services/store-token.service';
import { UploadService } from 'src/@theme/Services/upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() shopId;
  bookRepair = {
    device_id: null,
    problem_id: null,
    price: null,
    shop_id: null,
    image: [],
    cart_id: null,
    user_id: null,
  };

  brandList: any[];
  deviceList: any[];

  issueList: any[];
  formSubmitted: boolean = false;
  expectedPrice: any = '';
  files: File[] = [];
  shop;
  addedDeviceProblemToDisplayInCart = {
    id: null,
    deviceName: null,
    problemName: null,
    total_amount: null,
    ANOBaseFees: null,
    ANOCommissionFees: null,
    ShopCommissionFees: null,
    price: null,
    images: [],
    imageFiles: File,
    problemId: null,
    deviceId: null,
  };
  estimatedRepairTime;
  constructor(
    private headerService: HeaderService,
    private uploadService: UploadService,
    private shopService: ShopService,
    private activeModal: NgbActiveModal,
    private storeTokenService: StoreTokenService
  ) {}

  ngOnInit() {
    console.log('hello');

    this.shop = JSON.parse(localStorage.getItem('Shop'));
    console.log(this.shop);

    this.bookRepair.shop_id = this.shop.id;
    console.log(this.shop.id);

    // console.log(this.issueobj);
    this.Getdevices(this.shop.id);
  }
  Getdevices(id) {
    var obj = {
      shop_id: id,
    };
    console.log(obj);
    this.headerService.filterDevice(obj).subscribe(
      (data) => {
        console.log(data);
        this.deviceList = data['data'];
        console.log(this.deviceList);

        // this.deviceLists.forEach((e) => {
        //   if (e != null) {
        //     this.deviceList.push(e);
        //   }
        // });
        // debugger;
        // console.log(this.deviceList);
      },
      (error) => {}
    );
  }

  close() {
    this.activeModal.close();
  }

  getIssueList(event) {
    var issueobj = {
      shop_id: this.shop.id,
      device_id: this.bookRepair.device_id,
    };

    console.log(issueobj);

    this.headerService.filterProblem(issueobj).subscribe(
      (data) => {
        console.log(data, 'isssulistresponse');

        this.issueList = data['data'];
        console.log(this.issueList, 'issuelistss');
      },
      (error) => {}
    );

    // if (this.bookRepair.device_id && this.bookRepair.problem_id) {
    //   this.getExpectedPrice();
    // }

    // let obj = {
    //   device_id: event.target.value,
    // };

    // console.log(obj);
    // this.headerService.getIssueListById(obj).subscribe(
    //   (data) => {
    //     console.log(data, 'isssulistresponse');

    //     this.issueList = data['data'];
    //     console.log(this.issueList, 'issuelistss');
    //     this.getExpectedPrice();
    //   },
    //   (error) => {}
    // );
  }

  getExpectedPrice() {
    console.log('gsdfy');
    console.log(this.shop);
    let getExpectedPrice = {
      device_id: this.bookRepair.device_id,
      problem_id: this.bookRepair.problem_id,
      shop_id: this.shop.id,
    };
    console.log(this.shop.id);
    console.log(getExpectedPrice);
    this.shopService.getExpectedPrice(getExpectedPrice).subscribe(
      (data) => {
        console.log(data['data']);
        this.bookRepair.price = data['data'][0].TotalAmount;
        this.addedDeviceProblemToDisplayInCart.total_amount =
          data['data'][0].TotalAmount;
        this.addedDeviceProblemToDisplayInCart.ANOBaseFees = Number(
          data['data'][0].ANOBaseFees
        );
        this.addedDeviceProblemToDisplayInCart.ANOCommissionFees =
          data['data'][0].ANOCommissionFees;
        this.addedDeviceProblemToDisplayInCart.ShopCommissionFees =
          data['data'][0].ShopCommissionFees;

        this.issueList.forEach((element) => {
          if (element.id == this.bookRepair.problem_id) {
            this.addedDeviceProblemToDisplayInCart.problemName =
              element.problem.problemName;
            this.addedDeviceProblemToDisplayInCart.problemId = element.id;
          }
        });

        this.addedDeviceProblemToDisplayInCart.price = data['data'][0].price;
        this.estimatedRepairTime = data['data'][0].estimatedRepaidTime;
        this.setEstimatedTime();
      },
      (error) => {}
    );
  }
  setEstimatedTime() {
    console.log(this.estimatedRepairTime);
    var time = new Date('1970-01-01 ' + this.estimatedRepairTime);
    console.log(time.getHours());
    if (localStorage.getItem('estimatedTime')) {
      let previousEstimatedTime = JSON.parse(
        localStorage.getItem('estimatedTime')
      );
      if (previousEstimatedTime >= time.getHours()) {
        localStorage.setItem('estimatedTime', JSON.stringify(time.getHours()));
      }
    } else {
      localStorage.setItem('estimatedTime', JSON.stringify(time.getHours()));
    }
  }
  addDevice() {
    console.log(this.bookRepair);

    //check user is log in if log in then set user id
    this.bookRepair.user_id = JSON.parse(localStorage.getItem('user_id'));

    //set Cart_id if user is not log in
    this.bookRepair.cart_id = localStorage.getItem('cart_id');

    //set device name in display object
    this.deviceList.forEach((element) => {
      if (element.device.id == this.bookRepair.device_id) {
        this.addedDeviceProblemToDisplayInCart.deviceName =
          element.device.modelName;
        this.addedDeviceProblemToDisplayInCart.deviceId = element.device_id;
      }
    });

    //set problem name in display object
    this.issueList.forEach((element) => {
      if (element.problem.id == this.bookRepair.problem_id) {
        this.addedDeviceProblemToDisplayInCart.problemName =
          element.problem.problemName;
        this.addedDeviceProblemToDisplayInCart.problemId = element.problem.id;
      }
    });
    console.log(this.bookRepair);

    this.shopService.addCartData(this.bookRepair).subscribe(
      (data) => {
        console.log(data['data']);
        console.log(data['data'].id);
        localStorage.setItem('cart_id', data['data'].id);
      },
      (error) => {}
    );

    console.log(this.bookRepair.cart_id);
    console.log('obj', this.addedDeviceProblemToDisplayInCart);
    console.log(this.bookRepair);
    this.activeModal.close(this.addedDeviceProblemToDisplayInCart);
  }
}
