import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigureService } from './configure.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Inventory } from 'src/app/Model/inventory';
import { Options } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class FavoriteSearchService {
  
  constructor(
    private httpClient: HttpClient) {
     
   }

   AddFavoriteSearch(model: any): Observable<any> {
    
    return this.httpClient.post<any>(`${environment.API_URL}api/FavoriteSearch/AddFavoriteSearch`, model);
  }
  AddEditFavoriteSearch(model: any): Observable<any> {
    
    return this.httpClient.post<any>(`${environment.API_URL}api/FavoriteSearch/AddEditFavoriteSearch`, model);
  }
  UpdateFavoriteSearch(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}api/FavoriteSearch/UpdateFavoriteSearch`, model
    );
  }
  GetFavoriteSearch(): Observable<any>{
   

    return this.httpClient.get<any>(`${environment.API_URL}api/FavoriteSearch/GetFavoriteSearch`);
      
    
  }
}
