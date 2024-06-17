import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private route: ActivatedRoute){}
  users: any = [];
  id: number = 0;
  ngOnInit(): void {
    this.fetchProfile();
  }
  fetchProfile(){
    console.log('fetching:' + localStorage.getItem('tokenkey'))
    this.authService.getThisUser().subscribe(res =>{
      if(res['status'] == 'success'){
        this.users = res['data']['user'];
        console.log(this.users)
      }
    })
   
  }
}
