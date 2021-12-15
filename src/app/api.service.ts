import { BASE_URL, BASE_API, BASE_AUTH, BASE_CRUD_TODO } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  login(_login, _password): Observable<any> {
    return this.http.post(`${BASE_URL + BASE_API + BASE_AUTH}/login`, {
      login: _login,
      password: _password
    })
  }

  isLoggedIn() {
    return true;
  }
}
