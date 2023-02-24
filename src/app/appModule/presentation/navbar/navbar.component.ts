import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GetLoggedUserUseCase } from 'src/app/auth/domain/use-case/get-logged-user.usecase';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { LogoutUserUseCase } from '../../../auth/domain/use-case/logout-user.usecase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    GetLoggedUserUseCase,
    LogoutUserUseCase
  ]
})
export class NavbarComponent implements OnInit {
  private userInformation: string;

  isAuthUser: boolean = false;
  isAdminUser: boolean = false;
  loading: boolean = true;
  error: any;

  private getLoggedUserUseCase = inject(GetLoggedUserUseCase);
  private logoutUserUseCase = inject(LogoutUserUseCase);
  private router = inject(Router);
  private dialog = inject(MatDialog)

  ngOnInit(): void {
    this.getLoggedUserUseCase.execute().subscribe({
      next: (v) => {
        if(v) {
          this.isAuthUser = true;
          this.userInformation = v.name + " - " + v.role;
          if(v.role == "Admin") {
            this.isAdminUser = true;
          } else {
            this.isAdminUser = false;
          }
        } else {
          this.isAuthUser = false;
        }
        this.loading = false;
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
      }
    });

    if(this.isAuthUser) {
      if(this.isAdminUser) {
        this.navigateAdmin();
      } else {
        this.navigateUser();
      }
    } else {
      this.navigateAuthLogin();
    }
  }

  logout(): void {
    let logoutDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
         title: 'Logout',
         content: 'Are you sure you want to logout?'
        },
      width:'250px'
    });

    logoutDialog.afterClosed().subscribe(result => {
      if(result) {
        this.logoutUserUseCase.execute();
        this.navigateAuthLogin()
      }
    });
  }

  navigateUser(): void {
    this.router.navigate(['/user']);
  }

  navigateAdmin(): void {
    this.router.navigate(['/admin']);
  }

  navigateAuthLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateProfile(): void {
    this.router.navigate(['/auth/profile']);
  }

  getUserInformation(): string {
    return this.userInformation;
  }

}