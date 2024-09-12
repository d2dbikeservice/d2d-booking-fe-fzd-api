import { Component, Inject } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  selectedRow:any
  constructor(
    private bookingService:BookingsService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<DeleteDialogComponent>
  ){
  }

  ngOnInit(): void {
    this.selectedRow = this.data.data
  }

  deleteBooking(){
    this.bookingService.deleteBooking(this.selectedRow._id).subscribe(res => {
      this.dialogRef.close();
    })
  }
}
