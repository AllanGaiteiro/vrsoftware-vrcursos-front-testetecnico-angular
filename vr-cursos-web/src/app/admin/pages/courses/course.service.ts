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

  // CRUD
  find(options?: { relations?: string[], where: any }): Promise<CourseEntity[]> {
    return new Promise((resolve, rejects) => {
      const params = options ? new HttpParams().append('options', JSON.stringify(options)) : new HttpParams();
      return this.http.get<CourseEntity[]>(`${environment.backEndUrl}/${this.resource}`, { params }).subscribe(res => {
        this.logSucces('Find');
        resolve(res)
      });
    })
  }

  findOne(id: number): Promise<CourseEntity> {
    return new Promise((resolve, rejects) => {
      this.http.get<CourseEntity>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe(res => {
        this.logSucces('Find-One');
        resolve(res)
      });
    })
  }

  async create(data: CourseEntity): Promise<CourseEntity> {
    return new Promise((resolve, rejects) => {
      this.http.post<CourseEntity>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        this.logSucces('Create');
        resolve(res)
      })
    })
  }

  update(id: number, data: Partial<CourseEntity>): Promise<CourseEntity> {
    return new Promise((resolve, rejects) => {
      this.http.patch<CourseEntity>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
        this.logSucces('Update');
        resolve(res)
      })
    })
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, rejects) => {
      this.http.delete<void>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe((res) => {
        this.logSucces('Delete');
        resolve()
      })
    })
  }

  // Logs
  logSucces(text: string) {
    console.log(`Course Service - ${text} - Success`);
  }

  logError(text: string, error: any) {
    console.error(`Course Service - ${text} - Error Ocurred: `, error);
  }
}
