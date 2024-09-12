import { Component, Inject, OnInit } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  selectedRow!:any
  constructor(private bookingService:BookingsService,@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<DeleteDialogComponent>){

  }

  ngOnInit(): void {
    this.selectedRow = this.data.data
  }

  deleteBooking(){
    if(this.selectedRow){
      this.bookingService.deleteBooking(this.selectedRow._id).subscribe(res => {
        console.log('res', res);
        this.dialogRef.close();
      })
    }
  }
}
