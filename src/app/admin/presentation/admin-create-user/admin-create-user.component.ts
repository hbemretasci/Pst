import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegisterUseCase } from '../../domain/use-case/user-register.usecase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/shared/utils/state.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css'],
  providers: [UserRegisterUseCase]
})
export class AdminCreateUserComponent {
  passwordHide = true;
  
  createUserFormState: State = {
    title: 'Create User',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  organizations: string[] = ["Company", "Topunit"]; 
  roles: string[] = ["Admin", "Supervisor", "User"];

  private userRegisterUseCase = inject(UserRegisterUseCase);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  createUserForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    department: new FormControl(""),
    title: new FormControl(""),
    organization: new FormControl("Company"),
    organizationName: new FormControl("", [Validators.required]),
    role: new FormControl("User")
  })

  getNameErrorMessage(): string {
    return 'Please provide a name.';
  }

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

  getOrgNameErrorMessage(): string {
    return 'Please provide a company.';
  }

  get name() {
    return this.createUserForm.get('name');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get organizationName() {
    return this.createUserForm.get('organizationName');
  }

  register() {
    const createUser = {
        name: this.createUserForm.value.name,
        email: this.createUserForm.value.email,
        role: this.createUserForm.value.role,
        password: this.createUserForm.value.password,
        organization: this.createUserForm.value.organization,
        organizationName: this.createUserForm.value.organizationName,
        title: this.createUserForm.value.title,
        department: this.createUserForm.value.department,
        disabled: false  
    }

    this.createUserFormState.loading = true;
    this.userRegisterUseCase.execute(createUser).subscribe({
      next: (v) => {
        this.createUserFormState.loading = false;
        this.createUserFormState.data = v;
        this.showMessage();
      },
      error: (e) => {
        this.createUserFormState.loading = false;
        this.createUserFormState.error = true;
        this.createUserFormState.errorMessage = e.message;
        this.showError();
      } 
    });
  }

  showMessage(): void {
    this.snackBar.open(this.createUserFormState.data.fullName + ' user created.', '', {
      duration: 3000
    });
  }

  showError(): void {
    this.createUserFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.createUserFormState.title + " Error",
         content: this.createUserFormState.errorMessage
        },
      width:'250px'
    });
  }

  clearForm(): void {
    this.createUserForm.patchValue({
      name: '',
      email: '',
      password: '',
      department: '',
      title: '',
      organization: 'Company',
      organizationName: '',
      role: 'User'
    });
  }

}
