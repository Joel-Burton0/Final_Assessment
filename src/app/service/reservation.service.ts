import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment/environment'; 
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


  private API_URL = environment.api_url + '/api/v1/book';
  constructor(private _http:HttpClient) { }

  makeBooking(data: any):Observable<any> {
    return this._http.post<any>(this.API_URL + '/booking', data)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }

  viewRentalBooking(id:number):Observable<any> {
    return this._http.get<any>(this.API_URL + `/viewbooking/${id}`)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }
deletebooking(id:number):Observable<any> {
    return this._http.delete<any>(this.API_URL + `/deletebooking/${id}`)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }
getallReservations():Observable<any> {
    return this._http.get<any>(this.API_URL + `/allreservation`)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }
  updateBooking(id:number,data:any):Observable<any> {
    return this._http.patch(this.API_URL + `/updatebooking/${id}`,data)
      .pipe(
        map((res ) =>{
          return res
        })
      );
  }


}



