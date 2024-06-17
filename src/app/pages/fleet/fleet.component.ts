import { Component,OnInit} from '@angular/core';
import { FleetsearchService } from 'src/app/service/fleet.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit{
  constructor(private authservice:AuthService,private fleetsearchService:FleetsearchService,private router:Router,
    private route: ActivatedRoute
  ) {}
  fleets:any = [];
  

  ngOnInit(): void {
    this.fetchFleet(); 
  }
  fetchFleet(){
    this.fleetsearchService.getfleet().subscribe(res =>{
      if(res['status']== 'success'){
        this.fleets =res['data']['fleets'];
      }
    });

  }

  // Hard Coded Fleet Vehicles 
  cars = [
    {
      model: 'Tesla Model 3',
      description: 'Experience the future of driving with Tesla Model 3.',
      price:'$20,000',
      image: '/assets/images/Tesla_M_3.jpeg'
    },
    {
      model: 'Nissan Leaf',
      description: 'Eco-friendly and efficient Nissan Leaf.',

      price:'$10,000',
      image: '/assets/images/Nissan-Leaf.jpg'
    },
    {
      model: 'M235i xDrive Gran Coupe',
      description: 'TwinPower Turbo inline 4-cylinder',
      
      price:'$30,000',
      image: '/assets/images/BMW-Series-Gran-Coupe.jpeg'
    }
  ];

}
