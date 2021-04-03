import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  rating3 = 3;
  rating0 = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
