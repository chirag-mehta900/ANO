import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  URL = 'https://stripenodefoodito.herokuapp.com/';

  envUrl() {
    return 'https://ano-apis.herokuapp.com/api/';
  }

  userUrl(data: any) {
    return this.http.post(this.URL + 'users', data);
  }

  cardUrl(data: any) {
    return this.http.post(this.URL + 'cards', data);
  }

  paymentsUrl(data: any) {
    return this.http.post(this.URL + 'payments', data);
  }
}
