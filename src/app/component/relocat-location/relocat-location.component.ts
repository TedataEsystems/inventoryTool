import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  ids: number[] = [];
  form: FormGroup = new FormGroup({
    locationTo: new FormControl('')
  });
  updatedLocations: UpdatedLocation = {
    ids: [],
    locationTo: ''
  };
  locations: LocationName[] = []
  constructor(public dialogRef: MatDialogRef<RelocatLocationComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any, private InventoryCapacity: InventoryCapacityService, private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.ids = this.data;
    console.log(this.ids, "selected ids")
    this.InventoryCapacity.GetLocationsLists().subscribe((res) => {
      if (res.status == true) {
        console.log(res, "result of locations")
        console.log(res.inventoryLocations, "inv location")
        this.locations = res.inventoryLocations;
      } else {
        this.toastr.warning('Failed');
      }
      console.log(this.locations, "locations")
    });

  }
  onSubmit() {
    console.log(this.ids, "in submit");
    console.log(this.locations, "lo in submit")
    console.log(this.form.value.locationTo, "loc To in submit")

    if (this.form.valid) {
      this.updatedLocations.ids = this.ids;
      this.updatedLocations.locationTo = this.form.value.locationTo;
      console.log(this.updatedLocations, "updatedLoc in submit")
      this.inventoryService.UpdateInventoyLocations(this.updatedLocations).subscribe(res => {
        console.log(res)
        if (res.status == true) {
          this.toastr.success(':added successfully');
          this.onClose();
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
