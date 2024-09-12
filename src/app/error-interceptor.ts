import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService, private toastr:ToastrService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse) => {
          let errorMessage = "An unknown error occurrred";
          if(error.error.message){
            errorMessage = error.error.message
          }
          this.toastr.error(errorMessage)
          return throwError(error)
        })
      )
  }
}
