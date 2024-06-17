import { Component,OnInit } from '@angular/core';
import { NgForm,FormGroup,FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetsearchService } from 'src/app/service/fleet.service'; 
import { ReservationService } from 'src/app/service/reservation.service'; 
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor (private reservationService: ReservationService,
    private fleetService: FleetsearchService, private router:Router,
    private route: ActivatedRoute,private authservice: AuthService, private mail: FormBuilder){}
    
    
    formObj: any = [];
    id: any;
    users: any =[]
    rentals: any = [];


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getvehicle(this.id).subscribe(res => {
        if(res['status']== 'success'){
          this.rentals = res['data']['vehicle'];
        }
      })
    }
    this.fetchUserProfile();
    this.mailer();
  }


bookingRental(oForm: NgForm){
    console.log(oForm.value)
    this.id = this.route.snapshot.params['id'];
      oForm.value.id = this.id;     
      oForm.value.Fname = this.users.first_nm;
      oForm.value.Lname = this.users.last_nm;
      oForm.value.vehicle_nm = this.rentals.name;
    
      this.formObj = oForm.value;
      console.log(this.users);

    this.reservationService.makeBooking(this.formObj).subscribe(res =>{
      if(res['status'] == 'success'){
        Swal.fire({
          icon: 'success',
          title: 'REGISTRATION SUCCESSFUL',
        });
        this.fleetService.availableRental(this.id, this.formObj).subscribe(res => {
          this.router.navigateByUrl('/fleet');
        })
        this.mailer();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Register'
        })
      }
    })
  }
  fetchUserProfile(){
    console.log('fetching:' + localStorage.getItem('tokenKey'))
    this.authservice.getThisUser().subscribe(res =>{
      if(res['status']== 'success'){
        this.users = res['data']['user'];
      }
    })
  }

form:FormGroup = this.mail.group({
  subject: 'Booking Details',
  from_first_name: this.users.first_nm,
  from_last_name: this.users.last_nm,
  car_name: this.rentals.name,
  cost: this.rentals.price,
  reply_to: this.users.email
})


  async mailer(){
   emailjs.init('HwARygYwcsksAx9Zb') ;
  let response = await emailjs.send("service_bw5szml","template_7r9bc9q",{
    subject:this.form.value.subject,
    from_first_name: this.users.first_nm,
    from_last_name:  this.users.last_nm,
    car_name: this.rentals.name,
    cost: this.rentals.price,
    reply_to:  this.users.email
    });
}












}


