import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model"
import { flatMap, Subject } from "rxjs";
import { HttpClient} from '@angular/common/http'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { environment } from './../../environments/environment';
import { UserDataService } from "../userData.service";


const BACKEND_URL = environment.apiUrl + "/user"

@Injectable({providedIn:'root'})
export class AuthService{
  private token:any;
  private userDetailsLogged:any;
  private authStatusListener= new Subject<boolean>
  private isAuthencated = false
  private tokenTimer:any



  constructor(
    private http:HttpClient,
    private dataService:UserDataService,
    private router:Router,private toastr:ToastrService){

  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthencated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }

  createUser(userData:any){
    return this.http.post(BACKEND_URL + '/signup',userData).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      this.authStatusListener.next(false);
    })
  }

  login(userData:any){
    this.http.post<{token:string}>(BACKEND_URL +'/login',userData)
    .subscribe(response => {
        let result:any=response
        this.token = result.userData.userToken;
        if(this.token){
          this.isAuthencated = true;
          const expiresInDuration = result.userData.expiresIn;

          this.dataService.setLoggedData(result.userData)
          this.setAuthTimer(expiresInDuration)
          this.authStatusListener.next(true);
          this.userDetailsLogged = this.getLoggedinDetails()
          this.saveAuthData(result)
          this.router.navigate(['/'])
        }
      }, error => {
        this.authStatusListener.next(false)
      })
  }

  authAuthUser(){
    const authInformation:any = this.getAuthData()
    if(!authInformation){
      return
    }

    const now = new Date()
    const expiresIn = authInformation.expiresInDate.getTime() - now.getTime();

    if(expiresIn){
      this.token =authInformation.token
      this.isAuthencated = true;
      this.setAuthTimer(expiresIn / 1000)
      this.router.navigate(['/'])
      this.authStatusListener.next(true)
    }else{
      this.router.navigate(['/login'])
    }
  }

  getLoggedinDetails(){
    this.userDetailsLogged = localStorage.getItem('userData')
    if(!this.userDetailsLogged){
      return ''
    }
    return JSON.parse(this.userDetailsLogged)
  }

  logout(){
    this.token = null;
    this.isAuthencated = false;
    this.authStatusListener.next(false);
    localStorage.removeItem("userData");
    clearTimeout(this.tokenTimer)
    this.dataService.setLoggedData('')

    this.clearAuthData()
    this.router.navigate(['/login'])
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);

  }

  private saveAuthData(result:any){
    localStorage.setItem("userData", JSON.stringify(result.userData))
    this.userDetailsLogged = this.getLoggedinDetails()

  }

  private clearAuthData(){
    localStorage.removeItem("userData")
    this.userDetailsLogged = this.getLoggedinDetails()


  }

  private getAuthData(){
    const userData:any = localStorage.getItem('userData')
    if(!userData){
      return
    }
    let token = JSON.parse(userData).userToken;
    let expiresInDuration = JSON.parse(userData).expiresIn;
    if(!token || !expiresInDuration){
      return
    }
    return{
      token:token,
      expiresInDate:new Date(expiresInDuration)
    }
  }
}
