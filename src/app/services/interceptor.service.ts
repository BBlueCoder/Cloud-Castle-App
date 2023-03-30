import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(req.url.includes('files')){
            req = req.clone({
               headers:req.headers.set(
                'Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAxOTY3ODQsImRhdGEiOnsiaWQiOjMsInVzZXJuYW1lIjoidXNlcjIifSwiaWF0IjoxNjgwMTk0Njg0fQ.jgKrOgu9oeZg4WGA5K_TapGydXiNa5W6sVsZaoJuWRg'
               )
            });
        }

        console.log(req.headers);

        return next.handle(req);
    }

}