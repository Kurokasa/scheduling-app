import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
  })
export class jwtInterceptor implements HttpInterceptor {
    
    constructor(private user: UserService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.user.jwt;
        const authReq = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' +authToken)
        });
        return next.handle(authReq);
    }
}