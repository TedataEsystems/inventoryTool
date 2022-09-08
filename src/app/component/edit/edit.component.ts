import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditFormService } from 'src/app/shared/service/edit-form.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public service :EditFormService, public dialogRef: MatDialogRef<EditComponent>,public toastr:ToastrService) { }

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
  }
  onSubmit(){
    if(this.service.form.valid){
      this.service.form.reset();
    this.service.initializeFormGroup();
    this.toastr.success(':: Submitted successfully');
    this.onClose();

    }
  }
  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();

  }
}
