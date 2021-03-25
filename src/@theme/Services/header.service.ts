import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";
import { StoreTokenService } from "./store-token.service";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService,
    private token: StoreTokenService
  ) {}

  public isAuthenticated(): boolean {
    const token = this.token.get("token");
    return !!token ? true : false;
  }
  logIn(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + "login", data);
  }
  getUserName() {
    return this.httpClient.get(this.commonService.envUrl() + "user");
  }

  getEmail() {
    return this.httpClient.get(this.commonService.envUrl() + "user");
  }

  getBrandList() {
    return this.httpClient.get(this.commonService.envUrl() + "brand");
  }
  getDeviceList(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "device/filter/" + id
    );
  }
  getIssueListById(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "problem/filter",
      data
    );
  }
  searchStore(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "store/search",
      data
    );
  }
  signUp(data) {
    return this.httpClient.post(this.commonService.envUrl() + "register", data);
  }
  userAddress(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "user/address",
      data
    );
  }
  checkEmail(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "emailValidate",
      data
    );
  }

  slider() {
    return this.httpClient.get(this.commonService.envUrl() + 'slider');
  }
}
