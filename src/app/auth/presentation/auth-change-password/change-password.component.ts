import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
import { ChangePasswordUseCase } from '../../domain/use-case/change-password.usecase';
import Validation from 'src/app/shared/utils/matching.validator';

@Component({
  selector: 'auth-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ChangePasswordUseCase]
})
export class AuthChangePasswordComponent {
  newPasswordHide = true;
  confirmPasswordHide = true;
  
  changePasswordFormState: State = {
    title: 'Change Password',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  submitButtonTitle: string = "Change Password";

  private changePasswordUseCase = inject(ChangePasswordUseCase);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  changePasswordForm: FormGroup = new FormGroup({
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
    return this.changePasswordForm.hasError('matching') ? 'Passwords do not match.' : '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.changePasswordForm.controls;
  }

  submit(): void {
    if(this.submitButtonTitle === "Change Password") {
      this.changePassword();
    } else {
      this.cancel();
    }
  }

  changePassword() {
    const password: string = this.f['newPassword'].value;

    this.changePasswordFormState.loading = true;
    this.changePasswordUseCase.execute({ password }).subscribe({
      next: (v) => {
        this.changePasswordFormState.loading = false;
        this.changePasswordFormState.data = v;
        this.submitButtonTitle = "Close";
        this.showMessage();
      },
      error: (e) => {
        this.changePasswordFormState.loading = false;
        this.changePasswordFormState.error = true;
        this.changePasswordFormState.errorMessage = e.message;
        this.showError();
      } 
    });
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  showError(): void {
    this.changePasswordFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.changePasswordFormState.title + " Error",
         content: this.changePasswordFormState.errorMessage
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