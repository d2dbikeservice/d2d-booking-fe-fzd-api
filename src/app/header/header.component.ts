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

  constructor(
    private router:Router,
    private authService:AuthService
    ){}

  ngOnInit() {
    let userData:any = localStorage.getItem('userData');
    this.userName = userData ? JSON.parse(userData).userName : ''
    this.userIsAuthencated = this.authService.getIsAuth()
      this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthencated => {
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
