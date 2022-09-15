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
  isNotAdmin=false;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router :Router ,private config:ConfigureService) {
    var teamval=  localStorage.getItem("userGroup");
 
    if(teamval?.toLocaleLowerCase() != 'admin'){
   this.isNotAdmin=true;  
    
 }
   }


ngOnInit(): void {
// this.UserName=this.conser.UserName();
}

logOut(){
  this.config.Logout();
    this.router.navigateByUrl('/login');

}
public onToggleSidenav=()=> {
  this.sidenavToggle.emit();
  }

}
