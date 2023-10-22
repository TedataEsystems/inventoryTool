import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logs-details',
  templateUrl: './logs-details.component.html',
  styleUrls: ['./logs-details.component.css']
})
export class LogsDetailsComponent implements OnInit {

keys=[]
items=[];
valus=[]

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
    this.items=data.split(/[,]+/);
    //  this.keys =this.items.filter((item, index) => index%2 == 0)
    //  this.valus =this.items.filter((item, index) => index%2 != 0)
   // this.items=data.split(/[,:]+/);





  }

}
