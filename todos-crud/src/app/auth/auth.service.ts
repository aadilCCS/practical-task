import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiUrls } from '../config';

const TOKEN_KEY = 'accessToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private _httpClient: HttpClient,
  ) { }

  // login api
  signIn(credentials: { username: string; password: string }): Promise<any> {
    return lastValueFrom(this._httpClient.post(ApiUrls.LOGIN_USER, credentials));
  }

  // set token in local storage
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  // get token from local storage
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // remove token from local storage
  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  // logout user
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }

}
