import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { AuthRepository } from "../../data/auth.repository";
import { ForgotPassModel } from "../forgot-pass.model";

@Injectable()
export class ForgotPasswordUseCase implements UseCase<{ email: string }, ForgotPassModel> {   
    private authRepository = inject(AuthRepository);

    execute(params: { email: string }): Observable<ForgotPassModel> {
        return this.authRepository.forgotPassword(params);
    }
}