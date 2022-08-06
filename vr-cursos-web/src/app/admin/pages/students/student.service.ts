import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  resource:string ='students'
  constructor(private http: HttpClient) { }

  find(filter?: any): Observable<StudentEntity[]> {
    const params = filter ? new HttpParams().append('filter', filter) : '';
    return this.http.get<StudentEntity[]>(`${environment.backEndUrl}/${this.resource}` + params);
  }

  findOne(id: number): Observable<StudentEntity> {
    return this.http.get<StudentEntity>(`${environment.backEndUrl}/${this.resource}/${id}`);
  }

  async create(data: StudentEntity): Promise<StudentEntity> {
    return new Promise((resolve,rejects) => {
      this.http.post<StudentEntity>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  update(id: number, data: StudentEntity): Promise<StudentEntity> {
    return new Promise((resolve,rejects) => {
      this.http.patch<StudentEntity>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve,rejects) => {
      this.http.delete<void>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe(res => {
        resolve()
      })
    })
  }
}

