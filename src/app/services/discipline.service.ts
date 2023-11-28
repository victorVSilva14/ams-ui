import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Discipline } from '../models/discipline-resource';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private apiUrl = environment.baseUrl.concat('/disciplines');

  constructor(private http: HttpClient) {}

  getAllDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.apiUrl);
  }

  getDisciplineById(id: number): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Discipline>(url);
  }

  createDiscipline(discipline: Discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.apiUrl, discipline);
  }

  updateDiscipline(id: number, discipline: Discipline): Observable<Discipline> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Discipline>(url, discipline);
  }

  deleteDiscipline(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
