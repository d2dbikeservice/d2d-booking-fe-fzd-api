import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading:boolean=false
  private authStatusSubs!:Subscription


  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false
      }
    )

  }

  onLogin(loginForm:NgForm){
    if(loginForm.invalid){
      return
    }
    this.isLoading = true;
    this.authService.login(loginForm.value)

  }

  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe()
  }

}
