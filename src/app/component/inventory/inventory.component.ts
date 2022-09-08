import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { EditComponent } from '../edit/edit.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

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


  constructor(private titleService:Title, private toastr:ToastrService,private deleteService:DeleteService,private dialog: MatDialog,private _bottomSheet: MatBottomSheet)

  {

    this.titleService.setTitle("Inventory");

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

exportExcel(){}
ExportTOEmptyExcel(){}
openBottomSheet(){}


}
