import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-book-repair",
  templateUrl: "./book-repair.component.html",
  styleUrls: ["./book-repair.component.css"],
})
export class BookRepairComponent implements OnInit {
  selectDeviceFlag: boolean = true;
  selectIssueFlag: boolean = false;
  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  goToIssue() {
    this.selectDeviceFlag = false;
    this.selectIssueFlag = true;
  }

  goToDevice() {
    this.selectDeviceFlag = true;
    this.selectIssueFlag = false;
  }
  addRepair() {
    this.activeModal.close();
  }
}
