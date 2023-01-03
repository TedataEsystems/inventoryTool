import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceviedTypeService {

  constructor(private httpClient:HttpClient) { }
  getReceviedType(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/ReceviedType/GetReceviedType`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }
  AddReceviedType(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/ReceviedType/AddReceviedType`,model);
  }
  DeleteReceviedType(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/ReceviedType/DeleteReceviedType/`+id) ;
  }

  ReceviedTypeIsAlreadySigned(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/ReceviedType/ReceviedTypeIsAlreadySigned/`+name+`/`+id);  
  }

  UpdateReceviedType(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/ReceviedType/UpdateReceviedType`,model);
  }
}
