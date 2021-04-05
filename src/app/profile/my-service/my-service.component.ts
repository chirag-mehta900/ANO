import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css']
})
export class MyServiceComponent implements OnInit {
  rating3 = 3;
  rating0 = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
