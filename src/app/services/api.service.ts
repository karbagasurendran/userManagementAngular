import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import{catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NONE_TYPE } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http : HttpClient
  ) {this.getToken() }
  imgUrl = 'http://localhost:3000/public/'
  

  header: object;

  getToken() {
    const token = localStorage.getItem('token');
    this.header = { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) };
    return 'ok';
  }

  getuser(){
    console.log(this.header);
    return this.http.get(environment.apiUrl + 'users/user-list', this.header)
  }
 
  deleteUserById(id:any){
    return this.http.get(environment.apiUrl+'users/delete-user/'+ id,this.header)
  }

  updateUserById(id, data){
    return this.http.post(environment.apiUrl + 'users/update-user/' + id, data, this.header)
  }

  getUserById(id: string){
    return this.http.get(environment.apiUrl + 'employee/get-employee/' + id, this.header)
  }

//   /* Users Service */

  login(data){
    return this.http.post(environment.apiUrl + 'users/login', data)
  }
  register(data){
    return this.http.post(environment.apiUrl + 'users/register', data)
  }

saveUserImage(file): Observable<any>{
  return this.http.post(environment.apiUrl + 'users/profile',file, this.header)
  .pipe(
    catchError(this.handleError('Add file'))
  );
}


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
