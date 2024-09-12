import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BookingCreateComponent } from './bookings/booking-create/booking-create.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookingListComponent } from './bookings/booking-list/booking-list-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingLandingComponent } from './bookings/booking-landing/booking-landing.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditBookingComponent } from './bookings/edit-booking/edit-booking.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ViewBookingComponent } from './bookings/view-booking/view-booking.component';
import {ToastrModule} from 'ngx-toastr'
import { ErrorInterceptor } from './error-interceptor';
// import { GenerateBillComponent } from './bookings/generate-bill/generate-bill.component';
import { AngularMaterialModule } from './angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingCreateComponent,
    BookingListComponent,
    BookingLandingComponent,
    LoginComponent,
    SignupComponent,
    EditBookingComponent,
    ViewBookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor, multi:true},
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
