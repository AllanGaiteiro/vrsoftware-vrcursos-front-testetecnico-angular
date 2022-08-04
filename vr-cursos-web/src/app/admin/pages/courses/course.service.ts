import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  find(filter?: any): Observable<Course[]> {
    const params = filter ? new HttpParams().append('filter', filter) : '';
    return this.http.get<Course[]>(`${environment.backEndUrl}/courses` + params);
  }

  findOne(id: number): Observable<Course> {
    return this.http.get<Course>(`${environment.backEndUrl}/courses/${id}`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(`${environment.backEndUrl}/courses`, course);
  }

  update(id: number, course: Course): Observable<Course> {
    return this.http.patch<Course>(`${environment.backEndUrl}/courses/${id}`, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backEndUrl}/courses/${id}`);
  }
}
