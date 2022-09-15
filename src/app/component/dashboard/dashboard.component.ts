import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { NotificationService } from 'src/app/shared/service/notification.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  TotalNumorderStat:number=0;
  TotalNumReceiptStat:number=0;
  count:number=0;
  userRole= localStorage.getItem('userGroup');

 constructor(
    //private hardwareService:HardwareService,
    public notificationService: NotificationService,
   // public service:EmpService ,
    private titleService:Title,private dashboard:DashboardService,private router:Router ){

    this.titleService.setTitle("Home"); 
    
  }
  ngOnInit() {
    
  }
 
 
   


}

