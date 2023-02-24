import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRepository } from "../../data/auth.repository";
import { LoggedUser } from "../logged-user";

@Injectable()
export class GetLoggedUserUseCase {   
    private authRepository = inject(AuthRepository);

    execute(): Observable<LoggedUser> {
        return this.authRepository.getLoggedUser();
    }
}