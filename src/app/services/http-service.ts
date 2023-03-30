import { DuplicateUserError } from './../app-errors/duplicate-user-error';
import { UnauthorizedError } from './../app-errors/unauthorized-error';
import { NotFoundError } from './../app-errors/not-found-error';
import { AppError } from './../app-errors/app-error';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


export class HttpService {

    constructor(private baseUrl: string, private http: HttpClient) { }

    post<ResponeType>(endPoint: string, requestBody: {}, headers?: {}) {
        console.log(requestBody);
        return this.http.post<ResponeType>(
            `${this.baseUrl}/${endPoint}`,
            requestBody,
            headers
        ).pipe(catchError(this.handleError))
    }

    get<ResponseType>(endPoint: string, headers?: {}, params = '') {
        return this.http.get<ResponseType>(
            `${this.baseUrl}/${endPoint}?${params}`,
            { headers }
        ).pipe(catchError(this.handleError))
    }

    getFile(id: number, headers?: {}) {
        return this.http.get(
            `${this.baseUrl}/${id}`,
            { headers }
        ).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        switch (error.status) {
            case 401: {
                return throwError(() => new UnauthorizedError());
            }
            case 404: {
                return throwError(() => new NotFoundError());
            }
            case 406: {
                return throwError(() => new DuplicateUserError())
            }
            default: {
                return throwError(() => new AppError(error));
            }
        }
    }
}