import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { UserModel } from "../user.model";
import { AdminRepository } from "../../data/admin.repository";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class UserRegisterUseCase implements UseCase<{
    name: string,
    email: string,
    role: string,
    password: string,
    organization: string,
    organizationName: string;
    title: string,
    department: string,
    disabled: boolean
}, UserModel> {
    private adminRepository = inject(AdminRepository)

    execute(
        params: {
            name: string,
            email: string,
            role: string,
            password: string,
            organization: string,
            organizationName: string;
            title: string,
            department: string,
            disabled: boolean
        }
    ): Observable<UserModel> {
        return this.adminRepository.register(params);
    }
}