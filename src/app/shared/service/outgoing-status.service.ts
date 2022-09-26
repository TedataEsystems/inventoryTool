import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutgoingStatusService {

  constructor(private httpClient:HttpClient) { }
  getOutgoingStatus(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/OutgoingStatus/GetOutgoingStatus`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  AddOutgoingStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/OutgoingStatus/AddOutgoingStatus`,model);
  }


  DeleteOutgoingStatus(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/OutgoingStatus/DeleteOutgoingStatus/`+id) ;
  }

  OutgoingStatusIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/OutgoingStatus/OutgoingStatusIsAlreadySigned/`+name+`/`+id);  
  }

  UpdateOutgoingStatus(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/OutgoingStatus/UpdateOutgoingStatus`,model);
  }

}
