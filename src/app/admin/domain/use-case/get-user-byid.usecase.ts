import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { AdminRepository } from "../../data/admin.repository";
import { UserModel } from "../user.model";

@Injectable()
export class GetUserByIdUseCase implements UseCase<{ userId: string }, UserModel> {
    private adminRepository = inject(AdminRepository)

    execute(params: { userId: string }): Observable<UserModel> {
        return this.adminRepository.getUserById(params);
    }
}