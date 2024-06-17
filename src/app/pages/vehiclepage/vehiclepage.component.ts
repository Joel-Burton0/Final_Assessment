import { Component,OnInit } from '@angular/core';
import { FleetsearchService } from 'src/app/service/fleet.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehiclepage',
  templateUrl: './vehiclepage.component.html',
  styleUrls: ['./vehiclepage.component.css']
})
export class VehiclepageComponent implements OnInit {
  constructor(private authservice: AuthService, private fleetservice:FleetsearchService,
    private route: ActivatedRoute, private router: Router)  {}

    id:number = 0;
    rental: any;
    hasData:boolean = false;
  ngOnInit(): void {
      
    this.fetchRental() ;
  }

  fetchRental(){
    this.id = this.route.snapshot.params['id'];
    this.fleetservice.getvehicle(this.id).subscribe(res =>{
      if(res['status'] !== 'error'){
        this.rental =res['data']['vehicle'];
        this.hasData = true;
      }else{
        this.hasData = false;
      }
    });
  }

  




















}
