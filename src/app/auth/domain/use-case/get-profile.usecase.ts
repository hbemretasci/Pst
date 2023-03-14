import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/admin/domain/user.model";
import { AuthRepository } from "../../data/auth.repository";

@Injectable()
export class GetProfileUseCase {   
    private authRepository = inject(AuthRepository);

    execute(): Observable<UserModel> {
        return this.authRepository.getProfile();
    }
}