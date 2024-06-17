import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * @description Function to save any item to the local storage
 * @param key The unique identifier for the item to be stored
 * @param value The data to be stored
 */
export class AuthService {

  constructor( private http: HttpClient) { }
  private API_URL = environment.api_url + '/api/v1/auth';
  private tokenkey: string = 'authToken';
  
  public authToken?: string;
  public currentuser?: any;
  
  loginState?: boolean;

  private _saveToStorage(key: string, value: any){
    localStorage.setItem(key, value);
  }
  
  saveAuthToken(): void{
    this._saveToStorage(this.tokenkey, this.authToken );
  }

  isLoggedIn(): boolean{
    let token = localStorage.getItem(this.tokenkey);
    return token != null && token.length > 0;
  }

  getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenkey) : null;
  }
  
  getCurrentUser(cb?: () => void){
    this.getThisUser().subscribe((res) =>{
      if(res['status'] === 'success'){
        this.currentuser = res.data!['user'];
        if(cb) cb();
      }
    })
  }
  
  getThisUser(): Observable<any>{
    return this.http.get<any>(this.API_URL + '/my-profile')
    .pipe(
      map((res) =>{
        return res;
      })
    );
  }

  /**
   * @description Queries the API for all users
   * @returns Observable<any>
   */

  getAllUsers():Observable<any>{
    return this.http.get<any>(this.API_URL + '/all-users')
      .pipe(
        map((res) =>{
          return res;
        })
      );
  }

  // Register User
  newUser(data: any):Observable<any>{
    return this.http.post<any>(this.API_URL + '/register', data)
        .pipe(
          map((res) =>{
            return res;
          })
        );
  }

  // Login User
  loginUser(data: any): Observable<any>{
    return this.http.post<any>(this.API_URL + '/login', data)
        .pipe(
          map((res) =>{
            console.log(JSON.stringify(res));
            return res;
          })
        );
  }

  // Logout User
  logout(){
    localStorage.removeItem(this.tokenkey)
  }
}
