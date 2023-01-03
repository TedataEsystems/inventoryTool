import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyNameService {

  constructor(private httpClient:HttpClient) { }

  getCompanyName(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/CompanyName/GetCompanyName`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  addCompanyName(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/CompanyName/AddCompanyName`,model);
  }
  deleteCompanyName(id:any):Observable<any>
  {
 
    return this.httpClient.delete(`${environment.API_URL}api/CompanyName/DeleteCompanyName/`+id) ;
  }

  companyNameIsAlreadySigned(name:string,id:number ):Observable<any>
  {
   return this.httpClient.get<any>(`${environment.API_URL}api/CompanyName/CompanyNameIsAlreadySigned/`+name+`/`+id);  
  }

  updateCompanyName(model:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}api/CompanyName/UpdateCompanyName`,model);
  }





}
