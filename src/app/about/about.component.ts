import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  Filter: boolean = false;

  constructor() {}

  ngOnInit() {
    localStorage.setItem('filter', JSON.stringify(this.Filter));
  }
}
