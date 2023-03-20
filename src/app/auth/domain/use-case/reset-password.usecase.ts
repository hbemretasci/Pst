import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { AuthRepository } from "../../data/auth.repository";
import { MessageModel } from "../message.model";

@Injectable()
export class ResetPasswordUseCase {   
    private authRepository = inject(AuthRepository);

    execute(password: string, token: string): Observable<MessageModel> {
        return this.authRepository.resetPassword(password, token);
    }
}