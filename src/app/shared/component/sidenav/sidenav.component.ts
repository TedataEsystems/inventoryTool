import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isExpanded= true;
  isExpanded1= true;
  isExpanded2= true;
  showSubmenu = false;
  showSubmenu1 = false;
  showSubmenu2 = false
  isShowing = false;
  isShowing1 = false;
  isShowing2 = false;
  showSubSubMenu: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
