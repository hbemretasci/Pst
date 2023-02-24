import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { UserModel } from "../user.model";
import { AdminRepository } from "../../data/admin.repository";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class GetUsersByCategoryUseCase implements UseCase<{ categoryName: string }, UserModel[]> {
    private adminRepository = inject(AdminRepository)

    execute(params: { categoryName: string }): Observable<UserModel[]> {
        return this.adminRepository.getUsersByCategory(params);
    }
}