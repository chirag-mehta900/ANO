import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/@theme/Services/profile.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Output('addressId') addressId;
  disableButton: boolean = false;
  address : any

  constructor(
    private profile: ProfileService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.profile.getAddressbyID(this.addressId).subscribe((data) => {
      this.address = data['data'][0].addressLine;

    });
  }

  onSave() {
    this.disableButton = true;
    var data: any;
    this.profile.makedefault(this.addressId, data).subscribe((data) => {
      console.log(data);

      if(data['status'] == 200){
        this.activeModal.close();
      }
    });
    this.disableButton = false;
  }

  onDontSave() {
    this.activeModal.close();
  }
}
