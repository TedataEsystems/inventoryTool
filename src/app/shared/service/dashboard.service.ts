import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  GetReceviedStatusChart():Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/Dashboard/GetReceviedStatusChart`);
  }

  GetOutgoingStatusChart():Observable<any>
  {
    return this.httpClient.get<any>(`${environment.API_URL}api/Dashboard/GetOutgoingStatusChart`);
  }
  GetTotalChart():Observable<any>
  {
    return this.httpClient.get<any>(`${environment.API_URL}api/Dashboard/GetTotalChart`);
  }
}
