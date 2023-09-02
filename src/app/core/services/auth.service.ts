import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interfaces/auth.interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AUTH } from '../constants/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  logIn(user: Login): Observable<any> {
    return this.http.post<any>(environment.api.concat(AUTH.logIn), user).pipe(
      map((response: any) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  logOut(): Observable<any> {
    return this.http.post<any>(environment.api.concat(AUTH.logOut), {}).pipe(
      map((response: any) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }
}
