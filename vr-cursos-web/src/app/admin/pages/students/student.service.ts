import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentEntity } from 'src/app/core/models/student/entities/student.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  resource: string = 'students'
  constructor(private http: HttpClient) { }

  // CRUD
  find(options?: { relations?: string[], where: any }): Promise<StudentEntity[]> {
    return new Promise((resolve, rejects) => {
      const params = options ? new HttpParams().append('options', JSON.stringify(options)) : new HttpParams();
      return this.http.get<StudentEntity[]>(`${environment.backEndUrl}/${this.resource}`, { params }).subscribe(res => {
        this.logSucces('Find');
        resolve(res)
      });
    })
  }

  findOne(id: number): Promise<StudentEntity> {
    return new Promise((resolve, rejects) => {
      this.http.get<StudentEntity>(`${environment.backEndUrl}/${this.resource}/${id}`).subscribe(res => {
        this.logSucces('Find-One');
        resolve(res)
      });
    })
  }

  async create(data: StudentEntity): Promise<StudentEntity> {
    return new Promise((resolve, rejects) => {
      this.http.post<StudentEntity>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        this.logSucces('Create');
        resolve(res)
      })
    })
  }

  update(id: number, data: StudentEntity): Promise<StudentEntity> {
    return new Promise((resolve, rejects) => {
      this.http.patch<StudentEntity>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
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
    console.log(`Student Service - ${text} - Success`);
  }

  logError(text: string, error: any) {
    console.error(`Student Service - ${text} - Error Ocurred: `, error);
  }
}

