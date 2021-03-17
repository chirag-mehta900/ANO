import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderService } from "src/@theme/Services/header.service";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginInfo: FormGroup;
  formSubmitted: boolean = false;
  disableButton: boolean = false;
  invalidUserLog: boolean = false;
  constructor(
    private headerService: HeaderService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loginInfo = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        ),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  signUp() {
    this.activeModal.close();
    this.modalService.open(SignupComponent);
  }
  logIn() {
    this.formSubmitted = true;
    this.disableButton = true;
    this.invalidUserLog = false;
    if (this.loginInfo.valid) {
      this.headerService.logIn(this.loginInfo.value).subscribe(
        (data) => {
          if (data["status"] == 200) {
            console.log(data["data"].access_token);
            this.activeModal.close(data["data"].access_token);
            this.router.navigate(["/home"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.invalidUserLog = true;
          this.disableButton = false;
        }
      );
    } else {
      this.invalidUserLog = false;
      this.disableButton = false;
      return;
    }
  }
}
