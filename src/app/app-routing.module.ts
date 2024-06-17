import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { UtilsGuard } from './shared/utils.guard';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminprevComponent } from './pages/adminprev/adminprev.component';
import { CreateUnitComponent } from './pages/adminprev/create-unit/create-unit.component';
import { UpdateFileComponent } from './pages/adminprev/update-file/update-file.component';
import { RemoveFileComponent } from './pages/adminprev/remove-file/remove-file.component';
import { BookingComponent } from './pages/booking/booking.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { DeleteComponent } from './reservation/delete/delete.component';
import { UpdateComponent } from './reservation/update/update.component';
import { ViewComponent } from './reservation/view/view.component';
import { VehiclepageComponent } from './pages/vehiclepage/vehiclepage.component';

const routes: Routes = [  
  
  // AUTHENTICATION
  {path:'Login', title:'Login', component:AuthComponent },
  {path:'logout', title:'Login', component:LogoutComponent},
  {path:'Register', title:'Register', component:RegisterComponent },
  
  
  // USER SECTION
  {path:'booking/:id', title:'Booking', component:BookingComponent ,canActivate:[UtilsGuard]},
  {path:'home', title:'Home Page', component:HomeComponent },
  {path:'about',title:'About-Us',component:AboutComponent },
  {path:'services', title:'Services', component:ServicesComponent },
  {path:'fleet', title:'Catalog', component:FleetComponent },
  {path:'contact',title:'Contact Page',component:ContactComponent},
  {path:'vehicle/:id',title:'Vehicle Page',component:VehiclepageComponent},
  {path:'profile/:id',title:'Profile',component:UserprofileComponent,canActivate:[UtilsGuard]},
  
  
  // ADMIN SECTION
  {path:'addReservation', title:'reservation', component:AdminprevComponent },
  {path:'Admin', title:'Admin', component:AdminprevComponent,canActivate:[UtilsGuard] },
  {path:'create-file', title:'New File', component:CreateUnitComponent },
  {path:'update/:id', title:'Update-file', component:UpdateFileComponent },
  {path:'remove/:id', title:'Remove-file', component:RemoveFileComponent },
  {path:'reservation', title:'Reservations', component:ReservationComponent },
  {path:'deleteres/:id', title:'Delete Reservation', component:DeleteComponent },
  {path:'updateres/:id', title:'Update Reservation', component:UpdateComponent },
  {path:'viewbooking/:id', title:'View Reservation', component:ViewComponent },

  // SYSTEM NOT FOUND / REDIRECT
  {path:'',redirectTo: '/Login',pathMatch:'full'},
  {path:'**',component:NotFoundComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
