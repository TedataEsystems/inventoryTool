import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { DeleteMsgComponent } from 'src/app/shared/component/delete-msg/delete-msg.component';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { EditComponent } from '../edit/edit.component';
import { HistoryListComponent } from '../history-list/history-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  searchKey:string ='' ;
  isTableExpanded = false;
  TICKETS_DATA = [
    {
      "id": 1,
      "name": "Abby Jaskolski ",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }
      ]
    },
    {
      "id": 2,
      "name": "Jabari Fritsch",
      "age": 20,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }
        
      ]
    },
    {
      "id": 3,
      "name": "Maybell Simonis",
      "age": 21,
      "address": 1.0079,
      "isExpanded": false,
      "subjects": [
        {
          "name": "Bio",
          "type": "Medical",
          "grade": "A"
        }
       
      ]
    }
  ];

  
  constructor(private titleService:Title, private note:NotificationService,private deleteService:DeleteService,private dialog: MatDialog,private _bottomSheet: MatBottomSheet)
  
  {
    
    this.titleService.setTitle(" Home"); 
    
  }
 
  
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['id', 'name', 'age', 'address','history','action'];
  dataSource = new MatTableDataSource(this.TICKETS_DATA);
  // searchKey!:string;

  ngOnInit(){
   
  }

  ngAfterViewInit() { 
  
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }
    onCreate(){
     // this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
      this.dialog.open(EditComponent,dialogGonfig);
    }

    onEdit(){
      //this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';
      this.dialog.open(EditComponent,dialogGonfig);

    }
    onDelete(){
      this.deleteService.openConfirmDialog();
}
toggleTableRows() {
  this.isTableExpanded = !this.isTableExpanded;

  this.dataSource.data.forEach((row: any) => {
    row.isExpanded = this.isTableExpanded;
  })
}



//showHistory
showHistory(): void {
  this._bottomSheet.open(HistoryListComponent);
}

}
