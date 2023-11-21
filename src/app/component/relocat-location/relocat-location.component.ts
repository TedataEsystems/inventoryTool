import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, Inject, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryLocations } from 'src/app/Model/inventory-locations';
import { LocationName } from 'src/app/Model/location';
import { UpdatedLocation } from 'src/app/Model/updated-location';
import { InventoryCapacityService } from 'src/app/shared/service/inventory-capacity.service';
import { InventoryService } from 'src/app/shared/service/inventory.service';

@Component({
  selector: 'app-relocat-location',
  templateUrl: './relocat-location.component.html',
  styleUrls: ['./relocat-location.component.css']
})
export class RelocatLocationComponent implements OnInit {
  //ids: number[] = [];
  
  form: FormGroup = new FormGroup({
    locationTo: new FormControl('',[Validators.required]),
    meterORnumber:new FormControl(0,[Validators.required])
  });
  updatedLocations: UpdatedLocation = {
    inventory: {},
    locationTo: '',
    meterOrNumber:0
  };
  ShowOrHideMeterNumberinput:boolean=false;
  locations: any[] = []
  constructor(public dialogRef: MatDialogRef<RelocatLocationComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    console.log(this.data,"Data")
    this.updatedLocations.inventory = this.data;
    if(this.data.categoryId==46||this.data.categoryId==48||this.data.categoryId==49)
    {
      this.ShowOrHideMeterNumberinput=true;
    }
    this.inventoryService.GetLocationsLists().subscribe((res) => {
      if (res.status == true) {
        this.locations = res.locations;
      } else {
        this.toastr.warning('Failed');
      }
    });

  }
  onSubmit() {
    if (this.form.controls.locationTo.valid) {
      //this.updatedLocations.ids = this.ids;
      this.updatedLocations.locationTo = this.form.value.locationTo;
      this.updatedLocations.meterOrNumber=this.form.value.meterORnumber;
      this.inventoryService.UpdateInventoyLocations(this.updatedLocations).subscribe(res => {
        if (res.status == true) {
         if(res.data !="")
         {
          this.toastr.success(res.data);
         }
         if(res.error !="")
         {
          this.toastr.error(res.error)
         }
         this.onClose()
        }
        else {
          this.toastr.error(res.error);
          
         
            
         
        }
      }
      );
    }
  }
  onClose() {
    this.form.reset();
    this.dialogRef.close('save');
  }
  onClear() {
    this.form.reset();
  }

}
