import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryCapacityService {

  constructor(private httpClient: HttpClient) { }

  GetInventoryCapacity(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {

    let params = new HttpParams();
    if (PageNumber !== null && PageSize !== null) {
      params = params.append('pageNumber', PageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      params = params.append('searchValue', searchValue.toString());
      params = params.append('sortcolumn', sortcolumn.toString());
      params = params.append('sortcolumndir', sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/InventoryCapacity/GetInventoryCapacity`, { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    )
  }

  AddInventoryCapacity(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}api/InventoryCapacity/AddInventoryCapacity`, model);
  }
  UpdateInventoryCapacity(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}api/InventoryCapacity/UpdateInventoryCapacity`, model);
  }
  DeleteInventoryCapacity(id: any): Observable<any> {

    return this.httpClient.delete(`${environment.API_URL}api/InventoryCapacity/DeleteInventoryCapacity/` + id);
  }

  InventoryCapacityIsAlreadySigned(name: string, id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/InventoryCapacity/InventoryCapacityIsAlreadySigned/` + name + `/` + id);
  }
GetLocationsLists(): Observable<any> {
  return this.httpClient.get<any>(`${environment.API_URL}api/InventoryCapacity/GetLists`);
}

}
