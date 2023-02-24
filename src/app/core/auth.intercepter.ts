import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdateRequestUseCase } from "../auth/domain/use-case/update-request.usecase";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
    constructor(private updateRequestUseCase: UpdateRequestUseCase) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.updateRequestUseCase.execute(req, next);
    }
}