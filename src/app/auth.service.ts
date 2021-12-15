import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'token';

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(!!this.token);
  }

  login(_login: string, _password: string) {
    return this.apiService.login(_login, _password).pipe(
      tap((response: any) => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        localStorage.setItem(`user-id`, response.user.id);
        localStorage.setItem(`user-name`, response.user.name);
        this._isLoggedIn$.next(true);
      })
    )
  }

  logout(){
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(`user-id`);
    localStorage.removeItem(`user-name`);
  }

  isConnected(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  getUserName(){
    return localStorage.getItem(`user-name`);
  }
}
