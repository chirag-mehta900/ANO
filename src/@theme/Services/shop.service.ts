import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";
import { StoreTokenService } from "./store-token.service";

@Injectable({
  providedIn: "root",
})
export class ShopService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getStoreDetailById(id) {
    return this.httpClient.get(this.commonService.envUrl() + "store/" + id);
  }
  getExpectedPrice(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "addDevice",
      data
    );
  }
  getTimeByDate(data) {
    return this.httpClient.post(this.commonService.envUrl() + "slots", data);
  }
}
