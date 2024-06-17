import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';

import { ServicesComponent } from './pages/services/services.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './pages/contact/contact.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminprevComponent } from './pages/adminprev/adminprev.component';
import { CreateUnitComponent } from './pages/adminprev/create-unit/create-unit.component';
import { RemoveFileComponent } from './pages/adminprev/remove-file/remove-file.component';
import { UpdateFileComponent } from './pages/adminprev/update-file/update-file.component';

import { AuthComponent } from './auth/auth.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './service/contact.service';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { InterceptorInterceptor } from './shared/interceptor.interceptor';
import { DeleteComponent } from './reservation/delete/delete.component';
import { UpdateComponent } from './reservation/update/update.component';
import { ViewComponent } from './reservation/view/view.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { VehiclepageComponent } from './pages/vehiclepage/vehiclepage.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    NotFoundComponent,
       ContactComponent,
       FleetComponent,
       RegisterComponent,
       LogoutComponent,
       AdminprevComponent,
       CreateUnitComponent,
       RemoveFileComponent,
       UpdateFileComponent,
       AuthComponent,
       BookingComponent,
       UserprofileComponent,
       DeleteComponent,
       UpdateComponent,
       ViewComponent,
       ReservationComponent,
       VehiclepageComponent,
       
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass:InterceptorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
