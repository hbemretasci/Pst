import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
import { ResetPasswordUseCase } from '../../domain/use-case/reset-password.usecase';
import Validation from 'src/app/shared/utils/matching.validator';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.css'],
  providers: [ResetPasswordUseCase]
})
export class AuthResetPasswordComponent {
  newPasswordHide = true;
  confirmPasswordHide = true;
  
  resetPasswordFormState: State = {
    title: 'Reset Password',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  submitButtonTitle: string = "Reset Password";

  private resetPasswordUseCase = inject(ResetPasswordUseCase);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, {
    validators: [Validation.match('newPassword', 'confirmPassword')]
  });

  getNewPasswordErrorMessage(): string {
    if (this.f['newPassword'].hasError('required')) {
      return 'Please provide a password.';
    }
    return this.f['newPassword'].hasError('minlength') ? 'Password must be at least 6 chars.' : '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (this.f['confirmPassword'].hasError('required')) {
      return 'Please provide a password.';
    }
    if (this.f['confirmPassword'].hasError('minlength')) {
      return 'Password must be at least 6 chars.';
    }
    return this.resetPasswordForm.hasError('matching') ? 'Passwords do not match.' : '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  }

  submit(): void {
    if(this.submitButtonTitle === "Reset Password") {
      this.resetPassword();
    } else {
      this.cancel();
    }
  }

  resetPassword() {
    const password: string = this.f['newPassword'].value;
    this.resetPasswordFormState.loading = true;

    this.activatedRoute.params.subscribe(params => {
      this.resetPasswordUseCase.execute(password, params["resetToken"]).subscribe({
        next: (v) => {
          this.resetPasswordFormState.loading = false;
          this.resetPasswordFormState.data = v;
          this.submitButtonTitle = "Close";
          this.showMessage();
        },
        error: (e) => {
          this.resetPasswordFormState.loading = false;
          this.resetPasswordFormState.error = true;
          this.resetPasswordFormState.errorMessage = e.message;
          this.showError();
        } 
      });
    });
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

  showError(): void {
    this.resetPasswordFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.resetPasswordFormState.title + " Error",
         content: this.resetPasswordFormState.errorMessage
        },
      width:'250px'
    });
  }

  showMessage(): void {
    this.snackBar.open('Password updated.', '', {
      duration: 3000
    });
  }

}
