import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TEAMS } from '../constants/teams.constants';
import { Responses } from '../interfaces/default.interfaces';
import { Teams } from '../interfaces/teams.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  list(init: number, finish: number): Observable<Responses> {
    return this.http.get<Responses>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.list.concat(init + '/' + finish)))).pipe(
      map((response: Responses) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  create(team: Teams): Observable<Teams> {
    return this.http.post<Teams>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.create)), team).pipe(
      map((response: Teams) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  edit(team: Teams): Observable<Teams> {
    return this.http.put<Teams>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.edit + team.id)), team).pipe(
      map((response: Teams) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  delete(team: Teams): Observable<any> {
    return this.http.delete<any>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.delete + team.id))).pipe(
      map((response: any) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  searchById(id: number): Observable<Teams> {
    return this.http.get<Teams>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.search + id))).pipe(
      map((response: Teams) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }

  searchByDates(date1: string, date2: string): Observable<Teams[]> {
    return this.http.get<Teams[]>(environment.api.concat(TEAMS.endPoint.concat(TEAMS.search + date1 + '/' + date2 + '/'))).pipe(
      map((response: Teams[]) => {
          return response;
      }),catchError(error => {
          return throwError(error);
      })
    );
  }
}
