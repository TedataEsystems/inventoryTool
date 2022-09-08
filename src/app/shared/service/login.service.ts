import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/Model/login';
import { IUser } from 'src/app/Model/iuser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }


  getLogin(model: Login):Observable<IUser>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/account/login`,model);
  }
}
