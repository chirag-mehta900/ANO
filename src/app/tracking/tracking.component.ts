import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  public form: FormGroup;
  ID: any;
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
    // console.log(this.form.value);
    console.log(this.ID);
  }

  onOtpChange(event) {
    console.log(event);
    this.ID = event;
  }
}
