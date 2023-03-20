import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserModel } from "src/app/admin/domain/user.model";
import { UseCase } from "src/app/shared/utils/use-case";
import { AuthRepository } from "../../data/auth.repository";

@Injectable()
export class SaveUserProfileChangesUseCase implements UseCase<{
    name: string,
    organizationName: string,
    department: String,
    title: String
}, UserModel> {   
    private authRepository = inject(AuthRepository);

    execute(params: {
        name: string,
        organizationName: string,
        department: String,
        title: String
    }): Observable<UserModel> {
        return this.authRepository.saveUserChanges(params);
    }
}