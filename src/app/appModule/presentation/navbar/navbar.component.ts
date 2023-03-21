import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GetLoggedUserUseCase } from 'src/app/auth/domain/use-case/get-logged-user.usecase';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { State } from 'src/app/shared/utils/state.model';
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
  navbarState: State = {
    title: 'Navbar',
    loading: true,
    error: false,
    errorMessage: '',
    data: {
      isAuthUser: false,
      isAdminUser: false,
      userInformation: ''
    }
  }

  private getLoggedUserUseCase = inject(GetLoggedUserUseCase);
  private logoutUserUseCase = inject(LogoutUserUseCase);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  sub: any;

  ngOnInit(): void {
    this.getLoggedUserforNavigate();
  }

  getLoggedUserforNavigate(): void {
    this.sub = this.getLoggedUserUseCase.execute().subscribe({
      next: (v) => {
        if(v) {
          this.navbarState.data.isAuthUser = true;
          this.navbarState.data.userInformation = v.name + " - " + v.role;
          if(v.role == "Admin") {
            this.navbarState.data.isAdminUser = true;
          } else {
            this.navbarState.data.isAdminUser = false;
          }
        } else {
          this.navbarState.data.isAuthUser = false;
        }
        this.navbarState.loading = false;
      },
      error: (e) => {
        this.navbarState.error = e;
        this.navbarState.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout(): void {
    let logoutDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
         title: 'Logout',
         content: 'Are you sure you want to logout?'
        },
      width:'300px'
    });

    logoutDialog.afterClosed().subscribe(result => {
      if(result) {
        this.logoutUserUseCase.execute();
        this.navigateTarget('/auth/login');
      }
    });
  }

  navigateAdminHome(): void {
    if(this.navbarState.data.isAuthUser) {
      this.navigateTarget('/admin');
    } else {
      this.navigateTarget('/auth/login');
    }
  }

  navigateUserHome(): void {
    if(this.navbarState.data.isAuthUser) {
      this.navigateTarget('/user');
    } else {
      this.navigateTarget('/auth/login');
    }
  }

  navigateTarget(target: string): void {
    this.router.navigate([target]);
  }

  getUserInformation(): string {
    return this.navbarState.data.userInformation;
  }

  getIsAuthUser(): boolean {
    return this.navbarState.data.isAuthUser;
  }

  getIsAdminUser(): boolean {
    return this.navbarState.data.isAdminUser;
  }

}