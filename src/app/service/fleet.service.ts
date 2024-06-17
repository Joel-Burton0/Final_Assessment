import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FleetsearchService {
 

  private API_URL = environment.api_url + '/api/v1/Rental';

  constructor(private _http: HttpClient) { }


  // Get fleet 
  getfleet():Observable<any> {
    return this._http.get<any>(this.API_URL + '/getfleet')
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }
//Gets Single Vehicle
  getvehicle(id: number):Observable<any> {
    return this._http.get<any>(this.API_URL + `/getvehicle/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }
  // Creates vehicle Record
  addvehicle(data: any):Observable<any> {
    return this._http.post<any>(this.API_URL + `/addvehicle`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }
// Updates Vehicle Record
updatevehicle(id:number, data:any):Observable<any>{
    return this._http.patch(this.API_URL + `/updatevehicle/${id}`, data)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }
// // Deleting Vehicle Record
  deletevehicle(id: number):Observable<any> {
    return this._http.delete<any>(this.API_URL + `/deletevehicle/${id}`)
      .pipe(
        map((res) =>{
          return res;
        })
      )
  }
  availableRental(id:number,data:any):Observable<any> {
    return this._http.patch<any>(this.API_URL + `/available/${id}`, data)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }
  
}
