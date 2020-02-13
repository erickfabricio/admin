import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { EntityModel } from 'src/app/entity/models/entity.model';
import { UserModel } from 'src/app/entity/models/user.model';
import { SessionModel } from '../models/session.model';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  constructor(private http: HttpClient) { }

  login(user: UserModel): Observable<any> {
    return this.http.post(`http://localhost:3000/api/session/login`, user);
  }

  signOut(): Observable<any> {
    
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    });

    let options = {
      headers: headers
    };
        
    return this.http.post(`http://localhost:3000/api/session/signout`, null, options);
  }

  validate(): Observable<any> {
    
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    });

    let options = {
      headers: headers
    };
        
    return this.http.post(`http://localhost:3000/api/session/validate`, null, options);
  }


}
