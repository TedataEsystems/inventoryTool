import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OutgoingStatusList } from 'src/app/Model/outgoing-status-list';
import { ReceivedStatusList } from 'src/app/Model/received-status-list';
import { TypeStatus } from 'src/app/Model/type-status';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { InventoryService } from 'src/app/shared/service/inventory.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  dialogTitle:string = "";
  appear:boolean=false;
  isHidden:boolean=false;
  outgoingisHidden:boolean=false;

  TypeStatuslist: TypeStatus[] = [];
   ReceivedStatuslist: ReceivedStatusList[] = [];
  OutgoingStatuslist: OutgoingStatusList[] = [];

  

  constructor(public inventoryserv:InventoryService,public service :EditFormService, public dialogRef: MatDialogRef<EditComponent>,public notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: any ) { 
   
  }

  

  
  ngOnInit(){
    // this.dialogTitle = this.data.dialogTitle;
    //console.log("rowOnInt",this.data);
    if(this.data.dialogTitle !=="اضافة جديد"){
      this.dialogTitle= 'تعديل';
    }
    else{
      this.dialogTitle = this.data.dialogTitle;
    }

    
   this.inventoryserv.GettingLists().subscribe(res=>{
   // debugger
    if(res.status==true)
    {
    this.TypeStatuslist=res.typeStatus;
    this.ReceivedStatuslist=res.receviedStatus;
    this.OutgoingStatuslist=res.outgoingStatus;
 console.log(this.ReceivedStatuslist)
    if(this.data)
    {
      //set list in update
      var typstatuscount=0;
      var recviedstatuscount=0;
      var outgoingstatuscount=0;
      for(var typeStatus of this.TypeStatuslist )
      {
        if(this.data.typeStatusId==typeStatus.id)
        { 
          typstatuscount ++;
          this.service.form.controls['TypeStatusId'].setValue(this.data.typeStatusId);
          break;
        }
      }
      if(typstatuscount==0)
      {
        this.service.form.controls['TypeStatusId'].setValue(null);
      }
    
      for(var received of this.ReceivedStatuslist )
      {
        // debugger;
        if(this.data.receviedStatusId==received.id)
        {        
          recviedstatuscount ++;
          this.service.form.controls['ReceviedStatusId'].setValue(this.data.receviedStatusId);
          //this.isHidden=false;
          this.toggle();
          break;
        }
      }
      if(recviedstatuscount==0)
      {
        this.service.form.controls['ReceviedStatusId'].setValue(null);
        //this.toggle();
      }
      for(var outgoing of this.OutgoingStatuslist )
      {
        
        if(this.data.outgoingStatusId==outgoing.id)
        { 
          outgoingstatuscount ++;
         
          this.service.form.controls['OutgoingStatusId'].setValue(this.data.outgoingStatusId);
          this.outgoingtoggle();
          break;
        }
      }
      if(outgoingstatuscount==0)
      {
        this.service.form.controls['OutgoingStatusId'].setValue(null);
        
      }
    }
    }
    else{this.notificationService.warn(':: error')}



   });
//debugger
   if(this.data)
   {
    
    //console.log("condition entered")
    this.service.form.controls['Id'].setValue(this.data.id);
    this.service.form.controls['M'].setValue(this.data.m);
    this.service.form.controls['CustomerName'].setValue(this.data.customerName);
    this.service.form.controls['DeviceType'].setValue(this.data.deviceType);
    this.service.form.controls['OrderNumber'].setValue(this.data.orderNumber);
    this.service.form.controls['SerielNumber'].setValue(this.data.serielNumber);
    this.service.form.controls['RecipientName'].setValue(this.data.recipientName);
    this.service.form.controls['Team'].setValue(this.data.team);
    this.service.form.controls['Comment'].setValue(this.data.comment);
    this.service.form.controls['ReceivedDate'].setValue(this.data.receivedDate);
    this.service.form.controls['ExpriyDate'].setValue(this.data.expriyDate);
       /*this.service.form.controls['TypeStatusId'].setValue(this.data.typeStatusId);
    this.service.form.controls['ReceviedStatusId'].setValue(this.data.receviedStatusId);
    this.service.form.controls['OutgoingStatusId'].setValue(this.data.outgoingStatusId);*/
    this.service.form.controls['CreatedBy'].setValue(this.data.createdBy);
    this.service.form.controls['CreationDate'].setValue(this.data.creationDate);
   

   }
   




  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  toggle(){
    this.isHidden=!this.isHidden;
  }
  outgoingtoggle(){
    this.outgoingisHidden=!this.outgoingisHidden;
  }
  onSubmit(){
    this.appear=true;
    if(this.service.form.invalid){
      this.appear=false;
    return;
    }


  let inventory=  {
  M:this.service.form.value.M ,
  CustomerName:this.service.form.value.CustomerName,
  DeviceType:this.service.form.value.DeviceType,
  OrderNumber :this.service.form.value.OrderNumber,
  SerielNumber :this.service.form.value.SerielNumber,
  RecipientName :this.service.form.value.RecipientName,
  Team:this.service.form.value.Team,
  ReceivedDate:this.service.form.value.ReceivedDate,
  ExpriyDate:this.service.form.value.ExpriyDate,
  Comment :this.service.form.value.Comment,
  TypeStatusId :this.service.form.value.TypeStatusId,
  TypeStatus :this.service.form.value.TypeStatus,
  ReceviedStatusId :this.service.form.value.ReceviedStatusId,
  receviedStatus :this.service.form.value.ReceviedStatus,
  OutgoingStatusId :this.service.form.value.OutgoingStatusId,
  OutgoingStatusName :this.service.form.value.OutgoingStatus,
  CreationDate :this.service.form.value.CreationDate,
  CreatedBy:this.service.form.value.CreatedBy,
  
};


if(this.data.dialogTitle=="اضافة جديد")
{
  // console.log("add",this.service.form.value);
  // console.log("HwStatus",HwStatus);
    var changeHour= new Date(inventory.ExpriyDate.getFullYear(), inventory.ExpriyDate.getMonth(), inventory.ExpriyDate.getDate(), 5, 0, 0);
    inventory.ExpriyDate=changeHour;
    var changeHour1= new Date(inventory.ReceivedDate.getFullYear(), inventory.ReceivedDate.getMonth(), inventory.ReceivedDate.getDate(), 5, 0, 0);
    inventory.ReceivedDate=changeHour1;
  //Add
inventory.CreatedBy=localStorage.getItem('userName') || '';
    this.inventoryserv.AddInventory(inventory).subscribe(
      res=>{
        // console.log("model",this.service.form.value)
        // console.log("Status response",res)
        if(res.status=true)
        {
      this.notificationService.success(':: Submitted successfully');
      this.service.form.reset();
      this.dialogRef.close('save');
        }
        else{
          this.notificationService.warn(':: Failed');
    
        }
      
    },
   
  )
  }else
  {
    
    //update
     this.service.form.controls['UpdatedBy'].setValue(localStorage.getItem('userName') || '');
    //console.log("update",this.service.form.value);

    this.inventoryserv.UpdateInventory(this.service.form.value).subscribe(
      res=>{
        // console.log("ResponseInUpdate",this.service.form.value)
        // console.log("Status response",res)
        if(res.status=true)
        {
        this.notificationService.success(':: Updated successfully');
        this.service.form.reset();
        this.dialogRef.close('save');
      // this.onClose();

    
        }
        else{
          this.notificationService.warn(':: Failed');
    
        }
      
    },
   
  )
  } 


   




  }//submit
  onClose(){
    this.service.form.reset();
    // this.service.initializeFormGroup();
     this.dialogRef.close();

  }
}
