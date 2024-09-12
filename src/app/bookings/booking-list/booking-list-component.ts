import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Booking } from "../bookings.model";
import { BookingsService } from "../bookings.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BookingCreateComponent } from "../booking-create/booking-create.component";
import { EditBookingComponent } from "../edit-booking/edit-booking.component";
import { ViewBookingComponent } from "../view-booking/view-booking.component";
import { Subject, Subscription } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { DatePipe } from "@angular/common";

// const ELEMENT_DATA: any = [
//   {SNo: 1, customerName: 'Mr Nitish Singh', vehicleModel: 'Honda Activa',address: 'Ranoplai',contact: '7905588677',serviceScheuleDate: '27/05/2024'},
//   {SNo: 1, customerName: 'Mr Ranjeet Singh', vehicleModel: 'Honda Shine',address: 'Beniganj',contact: '7905588677',serviceScheuleDate: '27/05/2024'},
//   {SNo: 1, customerName: 'Miss Shobha', vehicleModel: 'Bajaj Pulsar',address: 'Rekabganj',contact: '7905588677',serviceScheuleDate: '27/05/2024'},
//   {SNo: 1, customerName: 'Mr Raj Kumar', vehicleModel: 'TVS Jupiter',address: 'Chowk',contact: '7905588677',serviceScheuleDate: '27/05/2024'},
//   {SNo: 1, customerName: 'Mr Krishna Jay', vehicleModel: 'Royal Enfiled',address: 'Ayodhya',contact: '7905588677',serviceScheuleDate: '27/05/2024'}

// ];

@Component({
  selector:'app-booking-list',
  templateUrl:'./booking-list.component.html',
  styleUrls:['./booking-list.component.css']

})
export class BookingListComponent implements OnInit, OnDestroy{
  bookings :any= []
  dataSource:any;
  displayedColumns:string[]=["S.No.","name", "vehicleModel","address","contact", "date",
     "status", "actions"]
  @ViewChild(MatPaginator) paginator!:MatPaginator
  isLoading:boolean=false;
  authStatusSubs!:Subscription
  pipe = new DatePipe('en-US');
  @Input() tabName!:string
  searchText:any=''
  @Input('clickSubject') clickSubject!:Subject<any>;

  constructor(
    private bookingService:BookingsService,
    private authService:AuthService,
    private dialog:MatDialog,
  ){
  }

  ngOnInit(): void {
    this.clickSubject.subscribe(e => {
      this.setBookingData()
    });
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false
      }
    )
    this.getBookings()
    // if(this.tabName == "Bookings"){
    //   this.getBookings()
    // }else if(this.tabName == "Completed Service"){
    //   this.getCompletedService()

    // }else if(this.tabName == "Todays Service"){
    //   this.getTodaysBookings()
    // }

}

setBookingData(){
  if(this.tabName == "Bookings"){
    this.displayedColumns = ["S.No.","name", "vehicleModel","address","contact", "date",
     "status", "actions"]
    this.getBookings()
  }else if(this.tabName == "Completed Service"){
    this.displayedColumns = ["S.No.","name", "vehicleModel","address","contact",
      "date", "isBillPaid", "totalBillAmount", "totalPaidAmount",
     "status", "actions"]
    this.getCompletedService()

  }else if(this.tabName == "Todays Service"){
    this.displayedColumns = ["S.No.","name", "vehicleModel","address","contact",
      "date", "assignedMechanic",
     "status", "actions"]
    this.getTodaysBookings()
  }

}

  getBookings(){
    this.isLoading = true;
    this.bookingService.getBookings().subscribe(res => {
      let result:any = res;
      this.bookings = result.bookings
      this.dataSource = new MatTableDataSource<any>(this.bookings)
      this.dataSource.paginator = this.paginator
      this.isLoading = false;
    })
  }
  getTodaysBookings(){
    this.isLoading = true;
    this.bookingService.getTodaysService().subscribe(res => {
      let result:any = res;
      this.bookings = result.bookings
      this.dataSource = new MatTableDataSource<any>(this.bookings)
      this.dataSource.paginator = this.paginator
      this.isLoading = false;
    })
  }
  getCompletedService(){
    this.isLoading = true;
    this.bookingService.getCompletedService().subscribe(res => {
      let result:any = res;
      this.bookings = result.bookings
      this.dataSource = new MatTableDataSource<any>(this.bookings)
      this.dataSource.paginator = this.paginator
      this.isLoading = false;
    })
  }

  addTask(){

    // let config: MatDialogConfig = {
    //   panelClass: "dialog-responsive",
    //   data:{
    //     type:"Add",
    //     data:null
    //   }
    // }
    // let addDialog = this.dialog.open(BookingCreateComponent,config)

    let addDialog = this.dialog.open(BookingCreateComponent, {
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {type:"Add",
        data:null},
    });

    addDialog.afterClosed().subscribe(item =>{
      // this.getBookings()
      this.setBookingData()

    })

  }

  editTask(rowData:any){
    let editDialog = this.dialog.open(EditBookingComponent, {
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {type:"Edit",
        data:rowData},
    });

    editDialog.afterClosed().subscribe(item =>{
      // this.getBookings()
      this.setBookingData()
    })
  }

  deleteTask(rowData:any){
    this.isLoading = true;
    this.bookingService.deleteBooking(rowData._id).subscribe(res => {
      this.getBookings()
    }, () => {
      this.isLoading = false
    })
  }

  markAsOld(data:any){
    let viewDialog = this.dialog.open(ViewBookingComponent,{
      panelClass: ['md:w-3/5', 'w-full'],
      maxHeight: '85vh',
      data: {type:"View",
        data:data},
    });

    // const bookingData:any={
    //   id:data._id,
    //   isNewBooking:false
    // }
    // this.bookingService.updateBooking(data._id, bookingData).subscribe(res => {
    // })
  }

  search(data:Event){
     this.searchText = (data.target as HTMLInputElement).value
    this.dataSource.filter = this.searchText
  }

  openBill(data:any){
    // this.dialog.open(GenerateBillComponent,{
    //   data:data
    // })
  }

  getStatusColor(status:string){
    // {value:"Enquiry", label:"Enquiry"},
    // {value:"Need To Schedule", label:"Need To Schedule"},
    // {value:"Service Completed", label:"Service Completed"},
    // {value:"Pending From Customer", label:"Pending From Customer"},
    // {value:"Pending From D2d", label:"Pending From D2d"},
    // {value:"Cancelled", label:"Cancelled"},
    if(status == 'Enquiry'){
      return 'enquiry'
    }
    else if(status == 'Need To Schedule'){
      return 'NeedToSchedule'
    }
    else if(status == 'Service Completed'){
      return 'ServiceCompleted'
    }
    else if(status == 'Pending From Customer'){
      return 'PendingFromCustomer'
    }
    else if(status == 'Pending From D2d'){
      return 'PendingFromD2d'
    }
    else if(status == 'Cancelled'){
      return 'Cancelled'
    }
    else if(status == 'Slot Booked'){
      return 'SlotBooked'
    }
    else if(status == 'Complaint'){
      return 'Complaint'
    }
    return ''
  }

  clearSearch(){
    this.searchText = ''
    this.dataSource.filter = this.searchText


  }

  ngOnDestroy(): void {
      this.authStatusSubs.unsubscribe();
      this.clickSubject.unsubscribe();
  }
}
