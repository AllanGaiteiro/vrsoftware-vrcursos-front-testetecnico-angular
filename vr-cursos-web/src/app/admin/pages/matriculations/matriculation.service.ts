import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMatriculationDto } from 'src/app/core/models/matriculation/dto/create-matriculation.dto';
import { Matriculation } from 'src/app/core/models/matriculation/entities/matriculation.entity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculationService {
  resource: string = 'matriculations';
  constructor(private http: HttpClient) { }

  find(options?: { relations?: string[], where: any }): Observable<Matriculation[]> {
    const params = options ?new HttpParams().append('options', JSON.stringify(options)): new HttpParams();
  
    return this.http.get<Matriculation[]>(`${environment.backEndUrl}/${this.resource}`, { params });
  }

  findOne(id: number): Observable<Matriculation> {
    return this.http.get<Matriculation>(`${environment.backEndUrl}/${this.resource}/${id}`);
  }

  async create(data: CreateMatriculationDto): Promise<Matriculation> {
    return new Promise((resolve, rejects) => {
      this.http.post<Matriculation>(`${environment.backEndUrl}/${this.resource}/`, data).subscribe(res => {
        resolve(res)
      })
    })
  }

  update(id: number, data: Partial<CreateMatriculationDto>): Promise<Matriculation> {
    return new Promise((resolve, rejects) => {
      this.http.patch<Matriculation>(`${environment.backEndUrl}/${this.resource}/${id}`, data).subscribe(res => {
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
