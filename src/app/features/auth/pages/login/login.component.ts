import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isInvalid(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);

    if (!control) {
      return true;
    }

    const hasError = control.hasError(errorCode);
    const touched = control.touched;

    return hasError && touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.message = '';

    const username = this.form.value.username;
    const password = this.form.value.password;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.loading = false;

        // DummyJSON responde 400 cuando las credenciales son incorrectas
        if (err.status === 400) {
          this.message = 'Usuario o contraseña incorrectos.';
        } else {
          this.message = 'No se pudo conectar con el servidor.';
        }
      },
    });
  }
}
