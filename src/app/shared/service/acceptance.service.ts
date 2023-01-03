import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcceptanceService {

  constructor(private httpClient:HttpClient) { }
  GetAcceptance(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/Acceptance/GetAcceptance`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  AddAcceptance(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Acceptance/AddAcceptance`,model);
  }

  DeleteAcceptance(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/Acceptance/DeleteAcceptance/`+id) ;
  }

  UpdateAcceptance(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Acceptance/UpdateAcceptance`,model);
  }
  AcceptanceIsAlreadySigned(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/Acceptance/AcceptanceIsAlreadySigned/`+name+`/`+id);  
  }
}
