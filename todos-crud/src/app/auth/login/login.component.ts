import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MaterialModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login submit
  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await this.authService.signIn(this.loginForm.value);
        this.authService.setToken(response?.accessToken);
        this.router.navigate(['/todos']);
      } catch (error: any) {
        this.snackBar.open(error?.error?.error, 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    } else {
      this.snackBar.open('Invalid credentials', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
