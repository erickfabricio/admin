import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityModel } from '../models/entity.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  token: string = localStorage.getItem("token");

  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
    //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBvc3RtYW4iLCJuYW1lIjoiVGVzdC1EZXYiLCJzdGF0ZSI6IkEiLCJpYXQiOjE1NzIxOTE1Njd9.PJEZWZKhWVOTsWAAIG-H2tTZp0g01LxVSifkQnhkJGQ'
  });

  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  find(entity: string): Observable<EntityModel[]> {    
    return this.http.get<EntityModel[]>(`${environment.api}/${entity}`, this.options).pipe(
      map(data => data.map(data => new EntityModel().deserialize(data)))
    );
  }

  findById(entity: string, entityModel: EntityModel): Observable<EntityModel> {
    return this.http.get<EntityModel>(`${environment.api}/${entity}/${entityModel._id}`, this.options);
  }

  save(entity: string, entityModel: EntityModel): Observable<EntityModel> {
    return this.http.post<EntityModel>(`${environment.api}/${entity}`, entityModel, this.options);
  }

  update(entity: string, entityModel: EntityModel): Observable<EntityModel> {    
    return this.http.put<EntityModel>(`${environment.api}/${entity}/${entityModel._id}`, entityModel, this.options);
  }

  remove(entity: string, entityModel: EntityModel): Observable<EntityModel> {
    return this.http.delete<EntityModel>(`${environment.api}/${entity}/${entityModel._id}`, this.options);
  }

}
