import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Inventory } from 'src/app/Model/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private headers = new HttpHeaders({  'Accept': 'application/json',
  'zumo-api-version': '2.0.0',});
  constructor(
    private httpClient: HttpClient,
    private config: ConfigureService) {
      this.headers = this.headers.set('Authorization', "Bearer " + this.config.UserToken());
   }

   AddInventory(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/AddInventory`, model);
  }


  DeleteInventory(id:any):Observable<any>
  {
    
    return this.httpClient.delete(`${environment.API_URL}api/Inventory/DeleteInventory/`+id );
  }



  getInventory(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/GetInventory` , {observe:'response' , params}).pipe(
      map(response => {
      
         return response.body ;
      })
    )
  }


  UpdateHardwareStatus(model: Inventory): Observable<any> {
    return this.httpClient.post<Inventory>(`${environment.API_URL}api/Inventory/UpdateInventory`, model
    );
  }

  GettingLists(): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/getSettingsList`
    );
  }


  DownloadAllDisplayDataOfExcel():Observable<Blob>{
    return this.httpClient.get(`${environment.API_URL}api/Inventory/ExportExcel`,{responseType: 'blob',headers: this.headers}); 
  }


  public importExcelFile(file : any)
  {
    //console.log("importservice",file)
    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/ImportExcelFile` , file , {headers : this.headers});
  }


  ExportEmptyExcel():Observable<Blob>{
    return this.httpClient.get(`${environment.API_URL}api/Inventory/ExportEmptyExcel`,{responseType: 'blob',headers: this.headers});
    
  }


}
