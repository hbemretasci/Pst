import { Component, inject, OnInit } from '@angular/core';
import { GetUsersByCategoryUseCase } from '../../domain/use-case/get-users-bycategory.usecase';
import { State } from 'src/app/shared/utils/state.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { GetAllUsersUseCase } from '../../domain/use-case/get-all-users.usecase';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [GetAllUsersUseCase]
})
export class AdminUsersComponent implements OnInit {
  filterText: string = "";
  role: string = "";

  usersFormState: State = {
    title: 'Users',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }
  
  private getAllUsersUseCase = inject(GetAllUsersUseCase);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.usersFormState.loading = true;
    this.getAllUsersUseCase.execute().subscribe({
      next: (v) => {
        this.usersFormState.loading = false;
        this.usersFormState.data = v;
      }, 
      error: (e) => {
        this.usersFormState.loading = false;
        this.usersFormState.error = true;
        this.usersFormState.errorMessage = e.message;
        this.showError();
      }
    });
  }

  showError(): void {
    this.usersFormState.error = false;
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: this.usersFormState.title + " Error",
         content: this.usersFormState.errorMessage
        },
      width:'250px'
    });
  }

}