import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  @Output('shopid') shopid;

  rating = 0;

  public form: FormGroup;
  Rating: boolean = false;
  Title: boolean = false;
  Comment: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private profile: ProfileService
  ) {}

  ngOnInit() {
    console.log(this.shopid);

    this.Rating = false;
    this.Title = false;
    this.Comment = false;

    this.form = new FormGroup({
      rating: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      commet: new FormControl(null, Validators.required),
    });
  }

  close() {
    this.activeModal.close();
  }

  submit() {
    if (
      this.form.value.rating == null ||
      this.form.value.title == null ||
      this.form.value.commet == null
    ) {
      if (!this.form.value.rating) {
        this.Rating = true;
      } else {
        this.Rating = false;
      }
      if (!this.form.value.title) {
        this.Title = true;
      } else {
        this.Title = false;
      }
      if (!this.form.value.commet) {
        this.Comment = true;
      } else {
        this.Comment = false;
      }
    } else {
      this.profile
        .SubmitReview(this.form.value, this.shopid)
        .subscribe((data) => {
          console.log(data);
          if (data['status'] == 200) {
            this.activeModal.close();
          }
        });
    }
  }
}
