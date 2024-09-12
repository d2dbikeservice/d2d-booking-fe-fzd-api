import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-booking-landing',
  templateUrl: './booking-landing.component.html',
  styleUrl: './booking-landing.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BookingLandingComponent {
  tabName:string='Bookings'
  clickSubject:Subject<any> = new Subject();

  notifyClick() {
    this.clickSubject.next(1);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    console.log('tabChangeEvent', tabChangeEvent.tab.textLabel);
    this.tabName = tabChangeEvent.tab.textLabel
    this.clickSubject.next(this.tabName);
  }

}
