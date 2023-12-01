import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user-resource';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl.concat('/users');

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    const body = { username, password };
    const headers = { 'Content-Type': 'application/json' };
  
    return this.getHttpClient().post<any>(`${this.apiUrl}/login`, JSON.stringify(body), { headers });
  }

  findByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}/${username}`;
    return this.getHttpClient().get<User>(url)
      .pipe(
        catchError((error: any) => {
          console.error('Erro ao carregar usuário: ', error);
          throw error;
        })
      );
  }

  private getHttpClient(): HttpClient {
    return this.httpClient;
  }
}