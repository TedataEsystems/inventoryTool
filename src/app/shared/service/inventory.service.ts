import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Inventory } from 'src/app/Model/inventory';
import { Options } from 'selenium-webdriver';
import { UpdatedLocation } from 'src/app/Model/updated-location';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',
  });
  constructor(
    private httpClient: HttpClient,
    private config: ConfigureService) {
    this.headers = this.headers.set('Authorization', "Bearer " + this.config.UserToken());
  }

  AddInventory(model: any): Observable<any> {

    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/AddNewInventory`, model);
  }


  DeleteInventory(id: any): Observable<any> {

    return this.httpClient.delete(`${environment.API_URL}api/Inventory/DeleteInventory/` + id);
  }




  getInventory(PageNumber: number, PageSize: number, searchValue: string, sortcolumn: string, sortcolumndir: string) {
    let params = new HttpParams();
    if (PageNumber !== null && PageSize !== null) {
      params = params.append('pageNumber', PageNumber.toString());
      params = params.append('pageSize', PageSize.toString());
      params = params.append('searchValue', searchValue.toString());
      params = params.append('sortcolumn', sortcolumn.toString());
      params = params.append('sortcolumndir', sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/GetInventory`, { observe: 'response', params }).pipe(
      map(response => {

        return response.body;
      })
    )
  }


  UpdateInventory(model: any): Observable<any> {
    return this.httpClient.post<Inventory>(`${environment.API_URL}api/Inventory/UpdateInventory`, model
    );
  }

  GettingLists(): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/getSettingsList`
    );
  }
  GetCategoryByTypeId(id: any): Observable<any> {

    return this.httpClient.get(`${environment.API_URL}api/Inventory/GetCategoryByTypeId/` + id);
  }

  DownloadAllDisplayDataOfExcel(ids: number[]): Observable<Blob> {
    return this.httpClient.post(`${environment.API_URL}api/Inventory/ExportExcel`, ids, { responseType: 'blob', headers: this.headers });
  }


  public importExcelFile(file: any) {

    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/ImportExcelFile`, file, { headers: this.headers });

  }

  public importExcelFileWithLocation(file: any) {

    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/importExcelFileWithLocation`, file, { headers: this.headers });

  }

  ExportEmptyExcel(): Observable<Blob> {
    return this.httpClient.get(`${environment.API_URL}api/Inventory/ExportEmptyExcel`, { responseType: 'blob', headers: this.headers });

  }
  ExportEmptyExcelWithLocation(): Observable<Blob> {
    return this.httpClient.get(`${environment.API_URL}api/Inventory/ExportEmptyExcelWithLocation`, { responseType: 'blob', headers: this.headers });

  }
  UpdateInventoryStatusToRecevied(ids: number[]): Observable<any> {

    return this.httpClient.post(`${environment.API_URL}api/Inventory/UpdateInventoryStatusToRecevied`, ids);
  }

  UpdateInventoryStatusToOutgoing(ids: number[]): Observable<any> {

    return this.httpClient.post(`${environment.API_URL}api/Inventory/UpdateInventoryStatusToOutgoing`, ids);
  }

  AdvancedSearch(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}api/Inventory/AdvancedSearch`, data);
  }

  SerielNumberIsAlreadySigned(SerielNumber: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/SerielNumberIsAlreadySigned/` + SerielNumber);
  }
  SerielNumberIsAlreadySignedInEdit(SerielNumber: string, id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/SerielNumberIsAlreadySignedInEdit/` + SerielNumber + `/` + id);
  }
  GetLocations(): Observable<any> {

    return this.httpClient.get(`${environment.API_URL}api/Inventory/GetLocations/`);
  }

  ExportExitPermitExcel(data: any): Observable<Blob> {


    return this.httpClient.post(`${environment.API_URL}api/Inventory/ExportExitPermitExcel`, data, { responseType: 'blob', headers: this.headers });

  }

  UpdateInventoyLocations(locations: UpdatedLocation): Observable<any> {

    return this.httpClient.post(`${environment.API_URL}api/Inventory/UpdateInvLocation`, locations);
  }
  GetLocationsLists(): Observable<any> {
    return this.httpClient.get<any>(`${environment.API_URL}api/Inventory/GetLists`);
  }



}
