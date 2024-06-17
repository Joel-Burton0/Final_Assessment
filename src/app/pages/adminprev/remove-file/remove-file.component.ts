import { Component ,OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetsearchService } from 'src/app/service/fleet.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-remove-file',
  templateUrl: './remove-file.component.html',
  styleUrls: ['./remove-file.component.css']
})
export class RemoveFileComponent implements OnInit {
  constructor (private fleetService:FleetsearchService, private router:Router, private route:ActivatedRoute){}

  rental: any = [];
  id: number = 0;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.fleetService.getvehicle(this.id).subscribe(res =>{
        if(res['status']=='success'){
          const rentData = res!['data']!['vehicle']
          this.rentalForm?.setValue({
            name: rentData['name'],
            description: rentData['description'],
            status: rentData['status'],
            price: rentData['price'],
            img: rentData['img']
            
          });
        }
      });
    }
  }
  @ViewChild('rentalForm')rentalForm?:NgForm;

  deleteFile(oForm: NgForm){
    this.fleetService.deletevehicle(this.id).subscribe(res => {

      if(res['status']=='success'){
        Swal.fire({
          icon: 'success',
          title: 'Successfully Removed Rental',
        });
        this.router.navigateByUrl('/Admin')
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Failed to Remove Rental'
        });
      }
    });
  }

}
