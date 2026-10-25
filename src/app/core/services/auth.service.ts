import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../features/auth/models/login-response.model';
import { SessionUser } from '../models/session-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
        username: username,
        password: password,
        expiresInMins: 30,
      })
      .pipe(
        map((response) => {
          this.saveSession(response);
          return response;
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/auth/login']);
  }

  // Guarda el token y los datos básicos del usuario
  private saveSession(response: LoginResponse) {
    const user: SessionUser = {
      id: response.id,
      username: response.username,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      image: response.image,
    };

    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return this.token !== null;
  }

  get user(): SessionUser | null {
    const data = localStorage.getItem(this.USER_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }
}