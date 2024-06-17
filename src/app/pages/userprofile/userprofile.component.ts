import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  constructor(private authService:AuthService,private route:ActivatedRoute){}
 
users:any =[];
id: number = 0;

ngOnInit(): void {
// this.fetchUserData();
  this.id = this.route.snapshot.params['id'];
  this.fetchUser();
}


fetchUser(){
  console.log('fetching:' + localStorage.getItem('tokenkey'))
  this.authService.getThisUser().subscribe(res =>{
    if(res['status']== 'success'){
      this.users = res['data']['user'];
    }
  })
}


// fetchUserData(){
//   console.log(`INSIDE FETCH USER DATA`);
// this.authService.getCurrentUser(()=>{
//   this.user = this.authService.currentuser;
//   console.log(`USER DATA: ${JSON.stringify(this.user)}`);
// });
// }




}
