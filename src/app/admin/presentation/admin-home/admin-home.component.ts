import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/utils/state.model';

@Component({
  selector: 'admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  menuItems: string[] = ['Admin Home', 'Create User', 'Users', 'User Home']; 

  adminHomeState: State = {
    title: 'Admin Home',
    loading: false,
    error: false,
    errorMessage: '',
    data: undefined
  }

  private router = inject(Router);

  ngOnInit(): void {
    this.adminHomeState.data = 0;
  }

  navigateComponent(i: number) {
    this.adminHomeState.data = i;

    switch(i) { 
      case 0: { 
        this.router.navigate(['/admin']);
        break; 
      } 
      case 1: { 
        this.router.navigate(['/admin/register']);
        break;  
      }
      case 2: { 
        this.router.navigate(['/admin/users']);
        break;  
     }
     case 3: { 
      this.router.navigate(['/user']);
      break;  
    }
   } 
  } 

}