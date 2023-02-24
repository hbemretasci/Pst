import { Observable, tap } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { LoggedUser } from "../logged-user";
import { LoginModel } from "../login.model";
import { AuthRepository } from "../../data/auth.repository";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class LoginUserUseCase implements UseCase<{ email: string, password: string }, LoginModel> {
    private authRepository = inject(AuthRepository);

    execute(params: { email: string, password: string }): Observable<LoginModel> {
        return this.authRepository.loginUser(params)
        .pipe(
            tap( r => {
                const validityTime: number = (new Date().getTime()) + parseInt(r.expiresIn);
                const loggedUser = new LoggedUser(r.name, r.email, r.role, r.token, new Date(validityTime));

                this.authRepository.addLoggedUserToSubject(loggedUser);

                this.authRepository.setLocalStorage("user", {
                    name: r.name,
                    email: r.email,
                    role: r.role,
                    token: r.token,
                    tokenExpirationDate: validityTime.toString()    
                });
            })
        )
    }
}