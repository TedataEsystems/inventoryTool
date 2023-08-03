import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InventoryCapacityService } from 'src/app/shared/service/inventory-capacity.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-add-inventoy-capacity',
  templateUrl: './add-inventoy-capacity.component.html',
  styleUrls: ['./add-inventoy-capacity.component.css']
})
export class AddInventoyCapacityComponent implements OnInit {

  isNameRepeated: boolean = false;
  dialogTitle: string = "";
  flag: boolean = false;

  inventoryCapacity = {
    Id: 0,
    inventoryName: "",
    devicesNumber: "",
    CreatedBy: ""
  }
  inventoryCapacityList: any[] = []
  inventoryCapacityListTab?: any[] = [];
  valdata = ""; valuid = 0;

  constructor(private loader: LoaderService, public service: InventoryCapacityService, private router: Router,
    public dialogRef: MatDialogRef<AddInventoyCapacityComponent>, public notificationService: NotificationService, @Inject(MAT_DIALOG_DATA) public data: any) { }


  form3: FormGroup = new FormGroup({
    Id: new FormControl(0),
    inventoryName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    devicesNumber: new FormControl('', [Validators.required]),
    CreationDate: new FormControl(null),
    UpdateDate: new FormControl(null),
    CreatedBy: new FormControl(null),
    UpdatedBy: new FormControl(null)
  });


  initializeFormGroup() {
    this.form3.setValue({
      Id: 0,
      inventoryName: '',
      devicesNumber: 0,
      CreationDate: null,
      CreatedBy: null,
      UpdateDate: null,
      UpdatedBy: null,
    })
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    if (this.data.dialogTitle !== "اضافة جديد") {
      this.dialogTitle = 'تعديل';
      this.flag = true;
    }
    else {
      this.dialogTitle = this.data.dialogTitle;
    }


    if (this.data) {
      this.form3.controls['Id'].setValue(this.data.id);
      this.form3.controls['inventoryName'].setValue(this.data.inventoryName);
      this.form3.controls['devicesNumber'].setValue(this.data.devicesNumber);
      this.form3.controls['CreatedBy'].setValue(this.data.createdBy);
      this.form3.controls['CreationDate'].setValue(this.data.creationDate);
    }
  }


  onSubmit() {
    if (!this.form3.valid) {
      return;
    }
    let inventoryCapacity = {
      inventoryName: this.form3.controls['inventoryName'].value,
      devicesNumber: this.form3.controls['devicesNumber'].value,
      CreationDate: this.form3.value.CreationDate,
      CreatedBy: this.form3.value.CreatedBy
    };

    if (this.data.dialogTitle == "اضافة جديد") {
      //Add
      inventoryCapacity.CreatedBy = localStorage.getItem('userName') || '';
      this.service.AddInventoryCapacity(inventoryCapacity).subscribe(
        res => {
          if (res.status = true) {
            this.notificationService.success(':: Submitted successfully');

            this.loader.idle();
            this.dialogRef.close('save');
            this.form3.reset();
          }
          else {
            this.notificationService.warn(':: Failed');
            this.loader.idle();
          }

        },

      )

    }

    else {
      //update



      this.form3.controls['UpdatedBy'].setValue(localStorage.getItem('userName') || '');
      this.service.UpdateInventoryCapacity(this.form3.value).subscribe(
        res => {
          if (res.status = true) {
            this.notificationService.success(':: Updated successfully');
            this.form3.reset();
            this.dialogRef.close('save');
            this.router.navigate(['/InventoryCapacity']);
          }
          else {
            this.notificationService.warn(':: Failed');
            this.loader.idle();

          }

        },

      )
    }
    this.loader.idle();
  }
  onClose() {
    this.form3.reset();
    this.dialogRef.close();
  }
}
