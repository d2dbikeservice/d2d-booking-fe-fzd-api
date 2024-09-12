import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading:boolean=false
  private authStatusSubs!:Subscription


  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log('authStatus', authStatus);

        this.isLoading = false
      }
    )

  }

  onSignup(signupForm:NgForm){
    if(signupForm.invalid){
      return
    }
    this.isLoading = true
    this.authService.createUser(signupForm.value)
  }

  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe()
  }
}
