import { Component, Inject } from "@angular/core";
import { BookingsService } from "../bookings.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { DateAdapter } from '@angular/material/core';
import { AuthService } from "../../auth/auth.service";
import { DatePipe } from "@angular/common";


@Component({
  selector:'app-booking-create',
  templateUrl:'./booking-create.component.html',
  styleUrls:['./booking-create.component.css'],
  providers:[DatePipe]
})
export class BookingCreateComponent{
  taskForm = new FormGroup({
    customerName: new FormControl('',Validators.required),
    vehicleModel: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    contact: new FormControl( '',[Validators.required, Validators.pattern('^[0-9]{10,10}$')]),
    serviceScheduledDate: new FormControl(new Date(),Validators.required),
  });

  constructor(private bookingService:BookingsService,private dialogRef: MatDialogRef<BookingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public builder:FormBuilder,
    private datePipe:DatePipe,
    private dateAdapter: DateAdapter<Date>, private authService:AuthService ){
        this.dateAdapter.setLocale('en-GB')
  }

  ngOnInit(): void {

  }


  onBookService(){
    let userData = this.authService.getLoggedinDetails();
    let temp:any = this.taskForm.controls.serviceScheduledDate.value
    const d = new Date(temp)
    const isoString = d.toISOString();

    const bookingData:any={
        customerName:this.taskForm.controls.customerName.value,
          vehicleModel:this.taskForm.controls.vehicleModel.value,
          address:this.taskForm.controls.address.value,
          city:"ayodhya",
          contact:this.taskForm.controls.contact.value,
          serviceEnquiryDate:new Date(),
          // serviceScheduledDate:this.datePipe.transform(this.taskForm.controls.serviceScheduledDate.value, 'yyyy-MM-dd'),
          serviceScheduledDate:isoString,
          serviceCompletedDate:'',
          status:"Enquiry",
          totalBillAmount:0,
          totalPaidAmount:0,
          isBillPaid:"",
          isNewBooking:true,
          comment:'',
          assignedMechanic:'',
          updatedBy:userData.userName,
    }

    if(this.taskForm.invalid){
      return
    }

    this.bookingService.addBooking(bookingData).subscribe(res => {
      this.dialogRef.close();
    })
  }

  addTask(){
    this.onBookService()
  }
  // updateTask(){

  // }
  resetForm(){
    this.taskForm.reset()
  }

}
