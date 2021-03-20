import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  config = {
    allowNumbersOnly: false,
    length: 12,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px',
      'padding':'4px',
      'font-size':'20px',
      'color':'#FFC542',
      'background':'#000000', 
      'border':'2px solid #1A1F27'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
