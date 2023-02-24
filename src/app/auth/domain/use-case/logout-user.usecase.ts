import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "../../data/auth.repository";

@Injectable()
export class LogoutUserUseCase {
    private authRepository = inject(AuthRepository);

    execute() {
        this.authRepository.removeLoggedUserFromSubject();
        this.authRepository.removeLocalStorage("user");
    }
}