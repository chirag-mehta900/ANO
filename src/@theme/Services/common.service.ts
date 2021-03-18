import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  envUrl() {
    return "https://ano-apis.herokuapp.com/api/";
  }
}
