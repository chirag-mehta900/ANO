import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}
  logIn(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + "login", data);
  }
  getUserName(id) {
    return this.httpClient.get(this.commonService.envUrl() + "user", {
      headers: id,
    });
  }
}
