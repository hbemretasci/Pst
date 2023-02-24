import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(catchError((err: HttpErrorResponse) => {
            let errorMessage = 'Unknown error!';

            if(!navigator.onLine) {
                let errorMessage = 'No internet connection.';
                return throwError(() => new Error(errorMessage));
            }

            if((err.error.success == false) && (err.error.message.length > 0)) {
                errorMessage = err.error.message;
            } else {
                if (err.error instanceof ErrorEvent) {
                    // Client-side errors
                    errorMessage = `Client Error: ${err.error.message}`;
                } else {
                    // Server-side errors
                    switch(err.status) {
                        case 0:
                            errorMessage = "Server Error: Server is unreachable.";
                            break;
                        case 404:
                            errorMessage = `Server Error: ${err.url} not found.`;
                            break;
                        default:
                            errorMessage = `Server Error: ${err.message}`;
                    }
                }
            }
            return throwError(() => new Error(errorMessage));
        }))
    }
}