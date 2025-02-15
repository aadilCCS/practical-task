import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'todos', 
    loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/todos' }
];
