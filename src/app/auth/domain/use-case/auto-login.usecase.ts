import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "../../data/auth.repository";
import { LoggedUser } from "../logged-user";

@Injectable()
export class AutoLoginUseCase {
    private authRepository = inject(AuthRepository);

    execute() {
        const storaggedUser = this.authRepository.getLocalStorage("user");
        if(!storaggedUser) return;

        const loggedUser = new LoggedUser(
            storaggedUser.name,
            storaggedUser.email, 
            storaggedUser.role, 
            storaggedUser.token, 
            new Date(parseInt(storaggedUser.tokenExpirationDate))
        );
        
        if(loggedUser.token) {
            this.authRepository.addLoggedUserToSubject(loggedUser);
        }
    }
}