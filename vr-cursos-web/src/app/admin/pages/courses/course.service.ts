import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseEntity } from 'src/app/core/models/course/course.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  resource: string = 'courses';
  constructor(private http: HttpClient) { }

  find(filter?: any): Observable<CourseEntity[]> {
    const params = filter ? new HttpParams().append('filter', filter) : '';
    return this.http.get<CourseEntity[]>(`${environment.backEndUrl}/${this.resource}` + params);
  }

  findOne(id: number): Observable<CourseEntity> {
    return this.http.get<CourseEntity>(`${environment.backEndUrl}/${this.resource}/${id}`);
  }

  async create(data: CourseEntity): Promise<CourseEntity> {
    return new Promise((resolve, rejects) => {
      this.http.post<CourseEntity>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  update(id: number, data: Partial<CourseEntity>): Promise<CourseEntity> {
    return new Promise((resolve, rejects) => {
      this.http.patch<CourseEntity>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, rejects) => {
      this.http.delete<void>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe(res => {
        resolve()
      })
    })
  }
}
