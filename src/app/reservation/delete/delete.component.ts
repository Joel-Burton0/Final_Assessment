import { Component,OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
constructor(private reservation: ReservationService,private router: Router,
  private route: ActivatedRoute,){}
  rental: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.reservation.viewRentalBooking(this.id).subscribe(res =>{
        if(res['status']=='success'){
          const booked = res!['data']!['reservation'];
          this.bookingform?.setValue({
            Fname: booked['Fname'],
            Lname: booked['Lname'],
            vehicle_nm: booked['vehicle_nm'],
            TRN: booked['TRN'],
            rentdate: booked['rentdate'],
            returndate: booked['returndate']
            
          });
        }
      });
    }
  }
  @ViewChild('bookingform')bookingform?:NgForm;

  deleteFile(oForm: NgForm){
    this.reservation.deletebooking(this.id).subscribe(res => {

      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Removed Reservation',
        });
        this.router.navigateByUrl('/reservation')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Remove Reservation',
        });
      }
    });
  }
}
