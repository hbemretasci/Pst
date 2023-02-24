import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRepository } from "../../data/auth.repository";

@Injectable()
export class UpdateRequestUseCase {
    private authRepository = inject(AuthRepository);

    execute(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authRepository.addTokenToRequest(req, next);
    }
}