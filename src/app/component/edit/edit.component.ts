import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public service :EditFormService, public dialogRef: MatDialogRef<EditComponent>,public notificationService: NotificationService) { }

  departments =[
    {id:3 ,value:"Dep-1"},
    {id:2 ,value:"Dep-2"},
    {id:3 ,value:"Dep-3"}

  ]
  ngOnInit(){
  }
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }
  onSubmit(){
    if(this.service.form.valid){
      //this.service.insertEmployee(this.service.form.value)
      this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
    this.onClose();

    }
  }
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();

  }
}
