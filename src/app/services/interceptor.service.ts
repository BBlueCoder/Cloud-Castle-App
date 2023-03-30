import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.url.includes('files')){
            req = req.clone({
               headers:req.headers.set(
                'Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAxOTM1NTcsImRhdGEiOnsiaWQiOjMsInVzZXJuYW1lIjoidXNlcjIifSwiaWF0IjoxNjgwMTkxNDU3fQ.bK2wq1rok04D7eXq2e5mKcvYb7_CMsUNRfBKbnfyelo'
               )
            });
        }

        console.log(req.headers);

        return next.handle(req);
    }

}