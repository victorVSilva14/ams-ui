import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discipline } from '../models/discipline-resource';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private apiUrl = environment.baseUrl.concat('/disciplines');

  constructor(private http: HttpClient) {}

  getAllDisciplines(): Observable<Discipline[]> {
    return this.getHttpClient().get<Discipline[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Erro ao carregar disciplinas: ', error);
          throw error; // Lança o erro novamente para ser tratado no componente
        })
      );
  }

  getDisciplineById(id: number): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.getHttpClient().get<Discipline>(url);
  }

  createDiscipline(discipline: Discipline): Observable<Discipline> {
    return this.getHttpClient().post<Discipline>(this.apiUrl, discipline);
  }

  updateDiscipline(id: number, discipline: Discipline): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.getHttpClient().put<Discipline>(url, discipline);
  }

  deleteDiscipline(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.getHttpClient().delete(url);
  }
  
  private getHttpClient(): HttpClient {
    return this.http;
  }
}
