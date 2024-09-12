import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.css',
})
export class ViewBookingComponent implements OnInit{
  bookingData:any
  createdData:any


  constructor(private dialogRef: MatDialogRef<ViewBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){

    }
    ngOnInit(): void {
        this.bookingData = this.data.data;
        console.log('key', this.bookingData);
        let result = [
          {
            name:'Customer Name',
            value:this.bookingData.customerName
          },
          {
            name:'Vehicle Model',
            value:this.bookingData.vehicleModel
          },
          {
            name:'Address',
            value:this.bookingData.address
          },
          {
            name:'Contact',
            value:this.bookingData.contact
          },
          {
            name:'Status',
            value:this.bookingData.status
          },
          {
            name:'Assigned Mechanic',
            value:this.bookingData.assignedMechanic
          },
          {
            name:'Bill Status',
            value:this.bookingData.isBillPaid
          },
          {
            name:'Enquiry Date',
            value:this.bookingData.serviceEnquiryDate
          },
          {
            name:'Schedule Date',
            value:this.bookingData.serviceScheduledDate
          },
          {
            name:'Completed Date',
            value:this.bookingData.serviceCompletedDate
          },
          {
            name:'Total Bill Amount',
            value:this.bookingData.totalBillAmount
          },
          {
            name:'Total Paid Amount',
            value:this.bookingData.totalPaidAmount
          },
          {
            name:'Updated By',
            value:this.bookingData.updatedBy
          },
          {
            name:'Comment',
            value:this.bookingData.comment
          },
        ]

        this.createdData = result
    }

    getobjectEntries() {
      return Object.entries(this.bookingData);
    }

    getColorName = (colorId:any) => {
      const filteredColor = this.bookingData.filter((a:any) => a === colorId)
      if (filteredColor.length > 0) {

        return filteredColor;
      }
      else{
        return '';
      }
    }

}
