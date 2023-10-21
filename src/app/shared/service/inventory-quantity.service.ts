import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigureService } from './configure.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryQuantityService {
  private headers = new HttpHeaders({  'Accept': 'application/json',
  'zumo-api-version': '2.0.0',});
  constructor(private httpClient: HttpClient, private config: ConfigureService) {
    this.headers = this.headers.set('Authorization', "Bearer " + this.config.UserToken());
   }
  GetInventoryQuantity(model: any,PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string): Observable<any> {
    console.log(model,"model")
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.post<any>(`${environment.API_URL}api/DeviceCapacity/DevicesSummary`, model, {observe:'response' , params}).pipe(
      map(response => {

         return response.body ;
      })
    )
  }
  GetAllInventoryQuantity(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string): Observable<any> {
    
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.post<any>(`${environment.API_URL}api/DeviceCapacity/AllDevicesSummary`, {observe:'response' , params}).pipe(
      map(response => {
console.log(response,"response")
console.log(response.body,"response")

return response ;
      })
    )
  }
  DownloadDataToExcel(model:any):Observable<Blob>{
    return this.httpClient.post(`${environment.API_URL}api/DeviceCapacity/ExportExcel`,model,{responseType: 'blob',headers: this.headers});
  }
  
  AddEditFavoriteSearchDevice(model: any): Observable<any> {
    
    return this.httpClient.post<any>(`${environment.API_URL}api/DeviceCapacity/AddEditFavoriteSearch`, model);
  }

  GetFavoriteDeviceSearch(): Observable<any>{
   

    return this.httpClient.get<any>(`${environment.API_URL}api/DeviceCapacity/GetFavoriteDeviceSearch`);
      
    
  }
}
