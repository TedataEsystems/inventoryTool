import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  
  constructor() { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    //M: new FormControl(0,[Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    CustomerName: new FormControl(''),/////777777
    RecipientName: new FormControl(''),///////333333
    OrderNumber: new FormControl(0),///////44444
    ReorderingPoint: new FormControl(null),
    BR: new FormControl(null),
    ItemCode: new FormControl(null),
    Meter: new FormControl(null),
    Number: new FormControl(null),
    Team: new FormControl(''),//////11111
    Status: new FormControl(''),
    
    SerielNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),////6666
    Comment: new FormControl(''),
    ReceivedDate: new FormControl(''),
    ExpriyDate: new FormControl(''),
    ReceviedStatusId: new FormControl(null),//,[Validators.required]),
    OutgoingStatusId: new FormControl(null),
    TypeStatusId: new FormControl(null),////////555555
    CategoryId: new FormControl(null),
    CompanyId: new FormControl(null),///////222222
    ReceviedTypeId: new FormControl(null),
    AcceptanceId: new FormControl(null),
    LocationId: new FormControl(null),
    CreationDate :new FormControl(null),
    UpdateDate :new FormControl(null),
    CreatedBy:new FormControl(null),
    UpdatedBy :new FormControl(null),
   
   
  });

  //////form1
 form1 : FormGroup = new FormGroup({
  Id: new FormControl(0),
  //M: new FormControl(0,[Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  CustomerName: new FormControl(''),
  RecipientName: new FormControl(''),
  OrderNumber: new FormControl(null),
  ReorderingPoint: new FormControl(null),
  BR: new FormControl(null),
  ItemCode: new FormControl(null),
  Meter: new FormControl(null),
  Number: new FormControl(null),
  Team: new FormControl(''),
  Status: new FormControl(''),

  SerielNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  Comment: new FormControl(''),
  ReceivedDate: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  ExpriyDate: new FormControl(''),
  ReceviedStatusId: new FormControl(null),//,[Validators.required]),
  OutgoingStatusId: new FormControl(null),
  TypeStatusId: new FormControl(null),
  CategoryId: new FormControl(null),
  CompanyId: new FormControl(null),
  ReceviedTypeId: new FormControl(null),
  AcceptanceId: new FormControl(null),
  LocationId: new FormControl(null),
  CreationDate :new FormControl(null),
  UpdateDate :new FormControl(null),
  CreatedBy:new FormControl(null),
  UpdatedBy :new FormControl(null),
 
 
});


  initializeFormGroup(){
    this.form.setValue({
      Id:0,
      CustomerName: '',
      Team: '',
      OrderNumber: null,
      RecipientName: '',
     
      Status: '',
      ReorderingPoint :null,
    BR :null,
    ItemCode :null,
    Meter :null,
    Number :null,
      SerielNumber:'',
      Comment: '',
      ReceivedDate: '',
      ExpriyDate: null,
      ReceviedStatusId: 0,
      OutgoingStatusId: 0,
      TypeStatusId:0,
      CategoryId:0,
      CompanyId:0,
      ReceviedTypeId: 0,
      AcceptanceId: 0,
      LocationId: 0,
      CreationDate:null,
      CreatedBy:null,
      UpdateDate:null,
      UpdateBy:null,
    })


    this.form1.setValue({
      Id:0,
      CustomerName: '',
      Team: '',
      OrderNumber: null,
      RecipientName: '',
     
      Status: '',
      ReorderingPoint :null,
    BR :null,
    ItemCode :null,
    Meter :null,
    Number :null,
      SerielNumber:'',
      Comment: '',
      ReceivedDate: '',
      ExpriyDate: null,
      ReceviedStatusId: 0,
      OutgoingStatusId: 0,
      TypeStatusId:0,
      CategoryId:0,
      CompanyId:0,
      ReceviedTypeId: 0,
      AcceptanceId: 0,
      LocationId: 0,
      CreationDate:null,
      CreatedBy:null,
      UpdateDate:null,
      UpdateBy:null,

    })
  }
}
