import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRepository } from "../../data/auth.repository";

@Injectable({
    providedIn: 'root'
})
export class IsLoggedUserUseCase {   
    private authRepository = inject(AuthRepository);

    execute(): Observable<boolean> {
        return this.authRepository.isLoggedUser();
    }
}