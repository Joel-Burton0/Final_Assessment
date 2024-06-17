import { Component,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

constructor(private reservation:ReservationService, private router: Router,
  private route: ActivatedRoute){}

  book: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.reservation.viewRentalBooking(this.id).subscribe(res => {

        if(res['status']=='success'){
          const booked = res!['data']!['reservation'];
          this.bookingform?.setValue({
            Fname: booked['Fname'],
            Lname: booked['Lname'],
            vehicle_nm: booked['vehicle_nm'],
            TRN: booked['TRN'],
            rentdate: booked['rentdate'],
            returndate: booked['returndate']
         
          })
        }
      })
    }
  }
  @ViewChild('bookingform')bookingform?:NgForm;

  updatebooking(oForm: NgForm){
    this.reservation.updateBooking(this.id, oForm.value).subscribe(res =>{
      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated'
        });
        this.router.navigateByUrl('/Admin');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Unable to Modify'
        });
      }
    });
  }





}
