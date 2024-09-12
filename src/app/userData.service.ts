import { Injectable } from "@angular/core";
import { flatMap, Subject } from "rxjs";
import { HttpClient} from '@angular/common/http'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({providedIn:'root'})
export class UserDataService{
  private userData:any

  constructor(){

  }

  setLoggedData(data:any){
    let tempUser:any = data
    this.userData = tempUser

  }

  getLoggedData(){
    return this.userData
  }


}
