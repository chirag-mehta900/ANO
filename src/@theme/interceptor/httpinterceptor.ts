import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { JwtTokenService } from "../services/jwt-token.service";
import { StoreTokenService } from "../services/store-token.service";
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  userId;
  errorMessage: string;
  constructor(
    private router: Router,
    private injector: Injector,
    private tokenService: StoreTokenService
  ) {
    // this.commonService.getUser();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      let service = this.injector.get(JwtTokenService);
      // this.userId = service.getDecodeToken("userId");
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // id: `${this.userId}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 403:
                this.errorMessage = "token expired";
                this.tokenService.remove("token");
                this.tokenService.remove("refreshToken");
                break;

              default:
                this.errorMessage = "Something went wrong!";
            }
          }
        }
      )
    );
  }
}
