import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
import { ForgotPasswordUseCase } from '../../domain/use-case/forgot-password.usecase';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './auth-forgot-password.component.html',
  styleUrls: ['./auth-forgot-password.component.css'],
  providers: [ForgotPasswordUseCase]
})
export class AuthForgotPasswordComponent {
  forgotPasswordFormState: State = {
    title: 'Forgot Password',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  submitButtonTitle: string = "Submit";

  private forgotPasswordUseCase = inject(ForgotPasswordUseCase);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Please provide a email.';
    }
    return this.email.hasError('email') ? 'Provide a valid email.' : '';
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  submit(): void {
    if(this.submitButtonTitle === "Submit") {
      this.sentMail();
    } else {
      this.navigate();
    }
  }

  showError(): void {
    this.forgotPasswordFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.forgotPasswordFormState.title + " Error",
         content: this.forgotPasswordFormState.errorMessage
        },
      width:'250px'
    });
  }

  sentMail(): void {
    const email: string = this.email.value;

    this.forgotPasswordFormState.loading = true;
    this.forgotPasswordUseCase.execute({ email }).subscribe({
      next: (v) => {
        this.forgotPasswordFormState.loading = false;
        this.forgotPasswordFormState.data = v;
        this.submitButtonTitle = "Close";
        this.showMessage();
      },
      error: (e) => {
        this.forgotPasswordFormState.loading = false;
        this.forgotPasswordFormState.error = true;
        this.forgotPasswordFormState.errorMessage = e.message;
        this.showError();
      } 
    });
  }

  showMessage(): void {
    this.snackBar.open('Reset password mail has been sent.', '', {
      duration: 3000
    });
  }

  navigate() {
    this.router.navigate(['/auth/login']);
  }

}
