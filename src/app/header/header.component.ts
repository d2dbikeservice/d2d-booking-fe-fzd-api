import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthencated = false;
  private authListenerSubs!:Subscription
  userName:string=''
  userRole:string=''

  constructor(
    private router:Router,
    private authService:AuthService
    ){}

  ngOnInit() {
    // let userData:any = localStorage.getItem('userData');
    let userData = this.authService.getLoggedinDetails()
    this.userName = userData.userName
    this.userRole = userData.userRole
    this.userIsAuthencated = this.authService.getIsAuth()
      this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthencated => {
        console.log("logging............");
        this.userIsAuthencated = isAuthencated


      })
  }

  logout(){
    this.authService.logout()
  }

  ngOnDestroy() {
      this.authListenerSubs.unsubscribe()
  }

}
