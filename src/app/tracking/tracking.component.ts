import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  public form: FormGroup;
  trackid: boolean = false;

  config = {
    allowNumbersOnly: false,
    length: 8,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '30px',
      height: '30px',
      padding: '4px',
      'font-size': '20px',
      color: '#FFC542',
      background: '#000000',
      border: '2px solid #1A1F27',
    },
  };

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      tracking: new FormControl(null, Validators.required),
    });
  }

  track() {
    this.trackid = false;
    // console.log(this.form.value);
    if (this.form.value.tracking.length == 8) {
      console.log('ok');
    } else {
      console.log('write properly');
      this.trackid = true;
      this.form.value.tracking = '';
    }
  }

  onOtpChange(event) {
    this.form.value.tracking = event;
  }
}
