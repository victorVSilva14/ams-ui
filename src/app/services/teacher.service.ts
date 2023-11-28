import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher-resource';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = environment.baseUrl.concat('/teachers');

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Teacher>(url);
  }

  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Teacher>(url, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
