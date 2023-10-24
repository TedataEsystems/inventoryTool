import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigureService } from '../../service/configure.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = localStorage.getItem("userName");
  team = localStorage.getItem("userGroup");
  isNotAdmin = false;
  isHadyTeam = false;
  flag: number = 0;
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router: Router, private config: ConfigureService) {
    var teamval = localStorage.getItem("userGroup");

    if (teamval?.toLocaleLowerCase() != 'admin') {
      this.isNotAdmin = true;

    }

  }


  ngOnInit(): void {

    if (this.team?.toLocaleLowerCase() == 'admin') {
      this.flag = 1;
    }
    else if (this.team?.toLocaleLowerCase() == 'inventory_hady') {
      this.flag = 2;
    }
    else if (this.team?.toLocaleLowerCase() == 'super_admin') {
      this.flag = 3;
    }
  }

  logOut() {
    this.config.Logout();
    this.router.navigateByUrl('/login');

  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  
}
