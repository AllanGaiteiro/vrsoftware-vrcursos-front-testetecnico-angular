import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course/course';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  resource:string = 'courses';
  constructor(private http: HttpClient) { }

  find(filter?: any): Observable<Course[]> {
    const params = filter ? new HttpParams().append('filter', filter) : '';
    return this.http.get<Course[]>(`${environment.backEndUrl}/${this.resource}` + params);
  }

  findOne(codigo: number): Observable<Course> {
    return this.http.get<Course>(`${environment.backEndUrl}/${this.resource}/${codigo}`);
  }

  async create(data: Course): Promise<Course> {
    return new Promise((resolve,rejects) => {
      this.http.post<Course>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  update(codigo: number, course: Course): Promise<Course> {
    return new Promise((resolve,rejects) => {
      this.http.patch<Course>(`${environment.backEndUrl}/${this.resource}/${codigo}`, course).subscribe(res => {
        resolve(res)
      })
    })
  }

  delete(codigo: number): Promise<void> {
    return new Promise((resolve,rejects) => {
      this.http.delete<void>(`${environment.backEndUrl}/${this.resource}/${codigo}`).subscribe(res => {
        resolve()
      })
    })
  }
}
