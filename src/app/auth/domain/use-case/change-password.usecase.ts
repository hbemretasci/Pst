import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { AuthRepository } from "../../data/auth.repository";
import { MessageModel } from "../message.model";

@Injectable()
export class ChangePasswordUseCase implements UseCase<{ password: string }, MessageModel> {   
    private authRepository = inject(AuthRepository);

    execute(params: { password: string }): Observable<MessageModel> {
        return this.authRepository.changePassword(params);
    }
}