import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
import { LoginUserUseCase } from '../../domain/use-case/login-user.usecase';

@Component({
  selector: 'auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  providers: [LoginUserUseCase]
})
export class AuthLoginComponent {
  passwordHide = true;
  loginFormState: State = {
    title: 'Login',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  private loginUserUseCase = inject(LoginUserUseCase);
  private router = inject(Router);
  private dialog = inject(MatDialog)

  userLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Please provide a email.';
    }
    return this.email.hasError('email') ? 'Provide a valid email.' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'Please provide a password.';
    }
    return this.password.hasError('minlength') ? 'Password must be at least 6 chars.' : '';
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  login() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    this.loginFormState.loading = true;
    this.loginUserUseCase.execute({ email, password }).subscribe({
      next: (v) => {
        this.loginFormState.loading = false;
        this.loginFormState.data = v;
        this.navigate();
      },
      error: (e) => {
        this.loginFormState.loading = false;
        this.loginFormState.error = true;
        this.loginFormState.errorMessage = e.message;
        this.showError();
      } 
    });

  }

  showError(): void {
    this.loginFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.loginFormState.title + " Error",
         content: this.loginFormState.errorMessage
        },
      width:'250px'
    });
  }

  navigate() {
    if(this.loginFormState.data.role == "Admin") {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

}
