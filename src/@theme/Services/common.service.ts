import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}
  URL = 'https://stripenodefoodito.herokuapp.com/';

  url = 'https://stripe-node-api.herokuapp.com/new/';

  envUrl() {
    return 'https://ano-apis.herokuapp.com/api/';
  }

  zipUrl = 'http://ziptasticapi.com/';

  pay(data) {
    return this.http.post(this.url + 'pay', data);
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

  getintouch(data) {
    return this.http.post(this.envUrl() + 'contactUs', data);
  }

  feedback(data) {
    return this.http.post(this.envUrl() + 'feedback', data);
  }

  zipcode(id) {
    return this.http.get(this.zipUrl + id);
  }
}
