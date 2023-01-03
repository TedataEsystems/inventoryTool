import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigureService } from '../../service/configure.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName =  localStorage.getItem("userName");
   team=  localStorage.getItem("userGroup");
  // allow=false;
  isNotAdmin=false;
  isHadyTeam=false;
flag:number=0;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router :Router ,private config:ConfigureService) {
    var teamval=  localStorage.getItem("userGroup");
   
    if(teamval?.toLocaleLowerCase() != 'admin' ){
   this.isNotAdmin=true;  
    
 }
 
   }


ngOnInit(): void {
// this.UserName=this.conser.UserName();
// if(this.team?.toLocaleLowerCase()!='inventory_hady')
// {
//  this.isHadyTeam=true;
// }
//  if(this.team?.toLocaleLowerCase() != 'inventory_user')
// {
//   this.isNotAdmin=true;
// }


// if(this.team=='Inventory_Hady')
// // if(this.team =='admin')
// {
//   this.allow=true;

// }
// else{
//   this.allow=false;
// }

//super_admin

if(this.team?.toLocaleLowerCase() == 'admin' )
{
  this.flag=1;
}
else if (this.team?.toLocaleLowerCase() == 'inventory_hady' ){
this.flag=2;
}
else if(this.team?.toLocaleLowerCase() == 'super_admin' )
{
  this.flag=3;
}
}

logOut(){
  this.config.Logout();
    this.router.navigateByUrl('/login');

}
public onToggleSidenav=()=> {
  this.sidenavToggle.emit();
  }
///this.team='admin'
  // onClick()
  // {
   
   
  //  if(this.team=='Hady_Team')
  //  {
  //   this.router.navigate(['/Type']);
  //  }
  //  else{
  //   alert("Not authorized");
  //  }
  // }



  // onClick1()
  // {
    
  //  if(this.team=='Hady_Team')
  //  {
  //   this.router.navigate(['/Category']);
  //  }
  //  else{
  //   alert("Not authorized");
  //  }
  // }
}
