import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
import { GetProfileUseCase } from '../../domain/use-case/get-profile.usecase';
import { SaveUserProfileChangesUseCase } from '../../domain/use-case/save-user-profile-changes.usecase';

@Component({
  selector: 'auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.css'],
  providers: [
    GetProfileUseCase,
    SaveUserProfileChangesUseCase
  ]
})
export class AuthProfileComponent implements OnInit  { 
  profileFormState: State = {
    title: 'Profile',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  private getProfileUseCase = inject(GetProfileUseCase);
  private saveUserProfileChangesUseCase = inject(SaveUserProfileChangesUseCase);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog)

  updateUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl({value: '', disabled: true}),
    department: new FormControl(''),
    title: new FormControl(''),
    organizationName: new FormControl('', [Validators.required]),
    role: new FormControl({value: '', disabled: true})
  })
  sub: any;

  getNameErrorMessage(): string {
    return 'Please provide a name.';
  }

  getOrgNameErrorMessage(): string {
    return 'Please provide a company.';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.updateUserForm.controls;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.profileFormState.loading = true;
    this.sub = this.getProfileUseCase.execute().subscribe({
      next: (v) => {
        this.profileFormState.loading = false;
        this.profileFormState.data = v; 
        this.updateForm();
      }, 
      error: (e) => {
        this.profileFormState.loading = false;
        this.profileFormState.error = true;
        this.profileFormState.errorMessage = e.message;
        this.showError();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}

  updateForm(): void {
    this.updateUserForm.patchValue({
      name: this.profileFormState.data.fullName,
      email: this.profileFormState.data.email,
      department: this.profileFormState.data.department,
      title: this.profileFormState.data.title,
      organizationName: this.profileFormState.data.organizationName,
      role: this.profileFormState.data.role
    });
  }

  showError(): void {
    this.profileFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.profileFormState.title + " Error",
         content: this.profileFormState.errorMessage
        },
      width:'250px'
    });
  }

  close() {
    this.router.navigate(['/user']);
  }

  save() {
    const updateUser = {
      name: this.updateUserForm.value.name,
      organizationName: this.updateUserForm.value.organizationName,
      title: this.updateUserForm.value.title,
      department: this.updateUserForm.value.department
    }
    this.profileFormState.loading = true;
    this.saveUserProfileChangesUseCase.execute(updateUser).subscribe({
      next: (v) => {
        this.profileFormState.loading = false;
        this.profileFormState.data = v; 
        this.showMessage();
      }, 
      error: (e) => {
        this.profileFormState.loading = false;
        this.profileFormState.error = true;
        this.profileFormState.errorMessage = e.message;
        this.showError();
      }
    });
  }

  showMessage(): void {
    this.snackBar.open(this.profileFormState.data.fullName + ' user changes saved.', '', {
      duration: 3000
    });
  }

}