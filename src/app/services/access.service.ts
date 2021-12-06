// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { AuthService } from "./../services/auth.service";
// import { HttpHeaders } from '@angular/common/http';
// import { Observable,throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccessService implements HttpInterceptor {
//   constructor(private authService: AuthService) { }
  
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
//     let token = localStorage.getItem('token');
//     if (!this.authService.isAuthenticated()) {
//       const authReq = req.clone({
//         setHeaders: {
//           'Content-Type':'application/json',
//           Authorization: `Bearer ${token}`  
//         }
//       });
//       return next.handle(authReq).pipe(
//           catchError(error =>{
//             if (error.status === 401 || error.status === 403) {
//                 // handle error
//               }
//               return throwError(error);
//           })
//       );
//     }
//   }
// }