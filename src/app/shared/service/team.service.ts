import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient:HttpClient) { }

  getTeam(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/Team/GetTeam`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  addTeam(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Team/AddTeam`,model);
  }
  deleteTeam(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/Team/DeleteTeam/`+id) ;
  }
  teamIsAlreadySigned(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/Team/TeamIsAlreadySigned/`+name+`/`+id);  
  }
  updateTeam(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Team/UpdateTeam`,model);
  }
}
