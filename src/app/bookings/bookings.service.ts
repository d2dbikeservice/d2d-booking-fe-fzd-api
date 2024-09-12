import { Injectable } from "@angular/core";
import { Booking } from "./bookings.model";
import { Subject } from "rxjs";
import { HttpClient} from '@angular/common/http'
import { environment } from './../../environments/environment';


const BACKEND_URL = environment.apiUrl + "/bookings/"

@Injectable({providedIn:'root'})
export class BookingsService{

  constructor(private http:HttpClient){

  }

  getBookings(){
    return this.http.get(BACKEND_URL)
  }

  getTodaysService(){
    return this.http.get(BACKEND_URL+'todaysService')
  }
  getCompletedService(){
    return this.http.get(BACKEND_URL+'completedService')
  }
  addBooking(bookingData:any){
    return this.http.post(BACKEND_URL, bookingData)
  }

  deleteBooking(id:any){
    return this.http.delete(BACKEND_URL+ id)
  }

  updateBooking(id:any, bookingData:any){
    return this.http.put(BACKEND_URL+ id, bookingData)
  }

  // updateNewBooking(id:any, bookingData:any){
  //   return this.http.put('http://localhost:3000/api/bookings/' + id, bookingData)
  // }

  // addBooking(
  //   customerName:string,
  //   vehicleModel:string,
  //   address:string,
  //   city:string,
  //   contact:string,
  //   serviceEnquiryDate:string,
  //   serviceScheduledDate:string,
  //    serviceCompletedDate:string,
  //    status:string,
  //   totalBillAmount:number,
  //    totalPaidAmount:number,
  //    isBillPaid:string,
  //    isNewBooking:boolean
  // ){
  //   const booking:any ={
  //     customerName:customerName,
  //     vehicleModel:vehicleModel,
  //     address:address,
  //     city:city,
  //     contact:contact,
  //     serviceEnquiryDate:serviceEnquiryDate,
  //     serviceScheduledDate:serviceScheduledDate,
  //     serviceCompletedDate:serviceCompletedDate,
  //     status:status,
  //     totalBillAmount:totalBillAmount,
  //     totalPaidAmount:totalPaidAmount,
  //     isBillPaid:isBillPaid,
  //     isNewBooking:isNewBooking,
  //   }
  //   this.http.post('http://localhost:3000/api/bookings', booking)
  // }
}
