import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient) { }

  GetLocation(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/Location/GetLocation`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  AddLocation(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Location/AddLocation`,model);
  }


  DeleteLocation(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/Location/DeleteLocation/`+id) ;
  }

  LocationIsAlreadySigned(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/Location/LocationIsAlreadySigned/`+name+`/`+id);  
  }

  UpdateLocation(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/Location/UpdateLocation`,model);
  }
}
