import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logs-details',
  templateUrl: './logs-details.component.html',
  styleUrls: ['./logs-details.component.css']
})
export class LogsDetailsComponent implements OnInit {

x=[]
items=[];

  constructor( public dialogRef: MatDialogRef<LogsDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

this.splitData();

  }
  onClose() {

    // this.service.initializeFormGroup();
    this.dialogRef.close();

  }

  splitData(){
    var data=this.data.data
    console.log('data',data);
    this.items=data.split(',');
    // this.items=data.split(/[,:]+/);
    // (/[!\s_]+/)
    console.log('itemsouter', this.items);




  }

}
