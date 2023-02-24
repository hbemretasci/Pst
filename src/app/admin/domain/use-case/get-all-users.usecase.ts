import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminRepository } from "../../data/admin.repository";
import { UserModel } from "../user.model";

@Injectable()
export class GetAllUsersUseCase {
    private adminRepository = inject(AdminRepository)

    execute(): Observable<UserModel[]> {
        return this.adminRepository.getAllUsers();
    }
}