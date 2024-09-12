import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingLandingComponent } from './booking-landing.component';

describe('BookingLandingComponent', () => {
  let component: BookingLandingComponent;
  let fixture: ComponentFixture<BookingLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
