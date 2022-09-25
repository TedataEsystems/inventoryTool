import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {

  
  constructor() { }
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    M: new FormControl(0,[Validators.min(1),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    CustomerName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    RecipientName: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    OrderNumber: new FormControl(0,[Validators.required,Validators.min(1),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Team: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Status: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    DeviceType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    SerielNumber: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Comment: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    ReceivedDate: new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    ExpriyDate: new FormControl('',[Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    ReceviedStatusId: new FormControl(0),//,[Validators.required]),
    OutgoingStatusId: new FormControl(0),//[Validators.required]),
    TypeStatusId: new FormControl(0,[Validators.required]),
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
      OrderNumber: '',
      RecipientName: '',
      M: 0,
      Status: '',
      DeviceType: '',
      SerielNumber:'',
      Comment: '',
      ReceivedDate: '',
      ExpriyDate: null,
      ReceviedStatusId: 0,
      OutgoingStatusId: 0,
      TypeStatusId:0,
      CreationDate:null,
      CreatedBy:null,
      UpdateDate:null,
      UpdateBy:null,

    })
  }
}
