import { Component, ElementRef, Inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OutgoingStatusList } from 'src/app/Model/outgoing-status-list';
import { ReceivedStatusList } from 'src/app/Model/received-status-list';
import { TypeStatus } from 'src/app/Model/type-status';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { InventoryService } from 'src/app/shared/service/inventory.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { Category } from 'src/app/Model/category';
import { ReceviedType } from 'src/app/Model/recevied-type';
import { CompanyName } from 'src/app/Model/company-name';
import { Acceptance } from 'src/app/Model/acceptance';
import { LocationName } from 'src/app/Model/location';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { Team } from 'src/app/Model/team';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  rowHeig = "400px"
  dialogTitle: string = "";
  appear: boolean = false;
  isHidden: boolean = false;
  outgoingisHidden: boolean = false;
  hidden: boolean = true;
  hidden1: boolean = true;
  MetterHidden: boolean = false;
  numberHidden: boolean = false;
  serialreq: number = 0;
  TypeStatuslist: TypeStatus[] = [];
  Teamlist: Team[] = [];
  public _TypeStatuslist: any[] = [];
  ReceivedStatuslist: ReceivedStatusList[] = [];
  OutgoingStatuslist: OutgoingStatusList[] = [];
  Category: Category[] = [];
  Category1: Category[] = [];
  ReceviedType: ReceviedType[] = [];
  CompanyName: CompanyName[] = [];
  Location: LocationName[] = [];
  Acceptance: Acceptance[] = [];
  isDisable=false
  flag: boolean = false;
  SerialNumber: string = '';
  flagh: boolean = false;
  statusflag: number = 0;
  serialnew: number = 0;
  serialflag: number = 0;
  flagComeFrom = false;
  selected = 0;
  @ViewChild('typeStatusSearch') typeStatusSearch!: ElementRef;
  constructor(public inventoryserv: InventoryService, private loader: LoaderService, public service: EditFormService,
    public dialogRef: MatDialogRef<AddComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {

  }




  ngOnInit() {
    if (localStorage.getItem("userGroup") == 'Inventory_Hady') {
      this.flagh = true
    }

    if (this.data.dialogTitle !== "اضافة جديد") {
      this.dialogTitle = 'تعديل';
      this.flag = true;
    }
    else {
      this.dialogTitle = this.data.dialogTitle;
    }


    this.inventoryserv.GettingLists().subscribe(res => {
      if (res.status == true) {
        this.TypeStatuslist = res.typeStatus;
        this.Teamlist = res.team;
        this._TypeStatuslist = res.typeStatus;
        this.ReceivedStatuslist = res.receviedStatus;
        this.OutgoingStatuslist = res.outgoingStatus;
        this.Category = res.category;
        this.ReceviedType = res.receviedType;
        this.Location = res.location;
        this.CompanyName = res.companyName;
        this.Acceptance = res.acceptance;
        this.service.form1.controls['comeFrom'].setValue('1');
        if (this.data) {
          var typstatuscount = 0;
          var teamcount = 0;
          var recviedstatuscount = 0;
          var outgoingstatuscount = 0;
          var categorycount = 0;
          var companynamecount = 0;
          var acceptancecount = 0;
          var receviedtypecount = 0;
          var locationcount = 0;
          for (var typeStatus of this.TypeStatuslist) {
            if (this.data.typeStatusId == typeStatus.id) {
              typstatuscount++;
              this.service.form1.controls['TypeStatusId'].setValue(this.data.typeStatusId);
              break;
            }
          }
          if (typstatuscount == 0) {
            this.service.form1.controls['TypeStatusId'].setValue(null);
          }


          for (var outgoing of this.OutgoingStatuslist) {

            if (this.data.outgoingStatusId == outgoing.id) {
              outgoingstatuscount++;

              this.service.form1.controls['OutgoingStatusId'].setValue(this.data.outgoingStatusId);
              this.outgoingtoggle();
              break;
            }
          }
          if (outgoingstatuscount == 0) {
            this.service.form1.controls['OutgoingStatusId'].setValue(null);

          }
          for (var category of this.Category) {



            if (this.data.categoryId == category.id) {


              categorycount++;

              this.service.form1.controls['CategoryId'].setValue(this.data.categoryId);

              break;
            }
          }
          if (categorycount == 0) {

            this.service.form1.controls['CategoryId'].setValue(null);
          }
          for (var company of this.CompanyName) {
            if (this.data.companyId == company.id) {
              companynamecount++;
              this.service.form1.controls['CompanyId'].setValue(this.data.companyId);
              break;
            }
          }
          if (companynamecount == 0) {
            this.service.form1.controls['CompanyId'].setValue(null);
          }
          for (var team of this.Teamlist) {
            if (this.data.teamId == team.id) {
              teamcount++;
              this.service.form1.controls['TeamId'].setValue(this.data.teamId);
              break;
            }
          }
          if (teamcount == 0) {
            this.service.form1.controls['TeamId'].setValue(null);
          }


          for (var acceptance of this.Acceptance) {
            if (this.data.acceptanceId == acceptance.id) {
              acceptancecount++;
              this.service.form1.controls['AcceptanceId'].setValue(this.data.acceptanceId);
              break;
            }
          }
          if (acceptancecount == 0) {
            this.service.form1.controls['AcceptanceId'].setValue(null);
          }
          for (var received of this.ReceviedType) {

            if (this.data.receviedTypeId == received.id) {
              receviedtypecount++;
              this.service.form1.controls['ReceviedTypeId'].setValue(this.data.receviedTypeId);

              this.toggle();
              break;
            }
          }
          if (receviedtypecount == 0) {
            this.service.form1.controls['ReceviedTypeId'].setValue(null);

          }

        }
      }
      else { this.toastr.warning(':: error') }



    });





    this.service.form1.controls['comeFrom'].setValue('1');
  }



  onClear() {

    this.service.form1.reset();
    this.service.initializeFormGroup();
  }
  toggle() {
    this.isHidden = !this.isHidden;
  }
  outgoingtoggle() {
    this.outgoingisHidden = !this.outgoingisHidden;
  }

  onSubmit() {
    this.isDisable=true
    let inventory = {
      id: this.service.form1.value.Id,
      CustomerName: this.service.form1.value.CustomerName,
      OrderNumber: this.service.form1.value.OrderNumber,
      ReorderingPoint: this.service.form1.value.ReorderingPoint,
      BR: this.service.form1.value.BR,
      ItemCode: this.service.form1.value.ItemCode,
      Meter: this.service.form1.value.Meter,
      Number: this.service.form1.value.Number,
      SerielNumber: this.service.form1.value.SerielNumber,
      RecipientName: this.service.form1.value.RecipientName,
      TeamId: this.service.form1.value.TeamId,
      Team: this.service.form1.value.Team,
      Status: this.service.form1.value.Status,
      ReceivedDate: this.service.form1.value.ReceivedDate,
      ExpriyDate: this.service.form1.value.ExpriyDate,
      Comment: this.service.form1.value.Comment,
      TypeStatusId: this.service.form1.value.TypeStatusId,
      TypeStatus: this.service.form1.value.TypeStatus,
      ReceviedStatusId: this.service.form1.value.ReceviedStatusId,
      receviedStatus: this.service.form1.value.ReceviedStatus,
      OutgoingStatusId: this.service.form1.value.OutgoingStatusId,
      OutgoingStatusName: this.service.form1.value.OutgoingStatus,
      CategoryId: this.service.form1.value.CategoryId,
      CategoryName: this.service.form1.value.Category,
      CompanyId: this.service.form1.value.CompanyId,
      CompanyName: this.service.form1.value.CompanyName,
      LocationId: this.service.form1.value.LocationId,
      LocationName: this.service.form1.value.LocationName,
      ReceviedTypeId: this.service.form1.value.ReceviedTypeId,
      ReceviedTypeName: this.service.form1.value.ReceviedType,
      AcceptanceId: this.service.form1.value.AcceptanceId,
      AcceptanceName: this.service.form1.value.Acceptance,
      CreationDate: this.service.form1.value.CreationDate,
      CreatedBy: this.service.form1.value.CreatedBy,
      comeFrom: this.service.form1.value.comeFrom
    };
    if (inventory.CategoryId != 46 && inventory.CategoryId != 47 && inventory.CategoryId != 48 && inventory.CategoryId != 49) {
      if (inventory.SerielNumber == null || inventory.SerielNumber == '') {
        this.serialreq = 1;
        this.isDisable=false
        return;
      }
    }
    if (!this.service.form1.valid || this.serialflag == 1) {
      this.isDisable=false
      return;
    }
    if (this.data.dialogTitle == "اضافة جديد") {


      if (inventory.id == null || inventory.id == 0) {
        inventory.CreatedBy = localStorage.getItem('userName') || '';
        this.inventoryserv.AddInventory(inventory).subscribe(
          res => {


            if (res.status == 'true') {
              this.toastr.success(':: Submitted successfully');
              this.service.form1.reset();
              this.isDisable=false
              this.loader.idle();
              this.dialogRef.close('save');
            }
            else if (res.status == 'false') {
              this.isDisable=false
              this.toastr.error(res.error);
            }
            else {
              if (res.status == 'type') {
                this.isDisable=false
                this.serialflag = 3;
              }
              else {
                this.toastr.warning(':: Failed');
                this.isDisable=false
                this.loader.idle();
              }

            }

          },

        )
      }
      else {
        this.service.form.controls['UpdatedBy'].setValue(localStorage.getItem('userName') || '');
        this.inventoryserv.UpdateInventory(inventory).subscribe(
          res => {
            if (res.status == 'true') {
              this.toastr.success(':: Updated successfully');
              this.service.form.reset();
              this.isDisable=false
              this.loader.idle();
              this.dialogRef.close('save');
            }
            else {
              if (res.status == 'type') {
                this.serialflag = 3;
                this.isDisable=false
              }
              else if (res.status == 'metergreat') {
                this.serialflag = 4;
                this.isDisable=false
              }
              else if (res.status == 'numbergreat') {
                this.serialflag = 5;
                this.isDisable=false
              }
              else {
                this.toastr.warning(':: Failed');
                this.loader.idle();
                this.isDisable=false
              }

            }

          },

        )
      }

    }
    this.loader.idle();
  }
  onClose() {
    this.service.form1.reset();
    this.dialogRef.close();
  }
  change() {
    this.hidden1 = true;
  }
  changhide() {
    this.hidden = true;
  }
  OnChangePopName(event: any) {


    this.inventoryserv.GetCategoryByTypeId(event.value).subscribe(res => {

      if (res.status == true) {
        var categorycount = 0;
        for (var category of this.Category) {

          if (category.id == 47 || category.id == 48 || category.id == 49) {
            this.MetterHidden = true;
            this.service.form1.controls['Meter'].setValidators([Validators.required]);
            this.service.form1.controls['Meter'].updateValueAndValidity();
            this.statusflag = 1;
            this.flagComeFrom = true;
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.service.form1.controls['ReceviedStatusId'].setValue(1);

          }
          else {
            this.MetterHidden = false;
            this.service.form1.controls['Meter'].clearValidators();
            this.service.form1.controls['Meter'].updateValueAndValidity();
          }
          if (category.id == 46) {
            this.numberHidden = true;
            this.service.form1.controls['Number'].setValidators([Validators.required]);
            this.service.form1.controls['Number'].updateValueAndValidity();
            this.statusflag = 1;
            this.flagComeFrom = true;
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.service.form1.controls['ReceviedStatusId'].setValue(1);


          }
          else {
            this.numberHidden = false;
            this.service.form1.controls['Number'].clearValidators();
            this.service.form1.controls['Number'].updateValueAndValidity();
          }
          if (res.data.id == category.id) {
            this.Category1.pop();
            this.Category1.push(category);

            categorycount++;

            this.service.form1.controls['CategoryId'].setValue(res.data.id);

            break;
          }
        }
        if (categorycount == 0) {

          this.service.form1.controls['CategoryId'].setValue(null);
        }

      }




    });

  }
  FillFiledsForUsedSerial(inventory: any) {
    this.service.form1.patchValue({
      Id: inventory.id,
      CustomerName: inventory.customerName,
      RecipientName: inventory.recipientName,
      OrderNumber: inventory.orderNumber,
      ReorderingPoint: inventory.reorderingPoint,
      BR: inventory.br,
      ItemCode: inventory.itemCode,
      Meter: inventory.meter,
      Number: inventory.number,
      TeamId: inventory.teamId,
      Comment: inventory.comment,
      ExpriyDate: inventory.expriyDate,
      OutgoingStatusId: inventory.outgoingStatusId,
      TypeStatusId: inventory.typeStatusId,
      CategoryId: inventory.categoryId,
      CompanyId: inventory.companyId,
      ReceviedTypeId: inventory.receviedTypeId,
      AcceptanceId: inventory.acceptanceId,
      LocationId: inventory.locationId,
      comeFrom: inventory.comeFrom
    })
  }

  onCheckSerialIsalreadysign() {

    this.SerialNumber = this.service.form1.value.SerielNumber;

    this.inventoryserv.SerielNumberIsAlreadySigned(this.SerialNumber).subscribe(
      res => {

        if (res.status == 'New') {
          this.service.initializeForm();
          this.serialnew == 1;
          this.ReceivedStatuslist = res.data;
          var recviedstatuscount = 0;
          for (var received of this.ReceivedStatuslist) {

            if (this.data.receviedStatusId == received.id) {
              recviedstatuscount++;
              this.service.form1.controls['ReceviedStatusId'].setValue(this.data.receviedStatusId);
              this.serialflag = 0;
              break;
            }
          }
          if (recviedstatuscount == 0) {
            this.selected = 1;
            this.service.form1.controls['ReceviedStatusId'].setValue(this.selected);
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.statusflag = 1;
            this.inventoryserv.GetLocations().subscribe(res => {

              if (res.status == true) {

                this.Location = res.data;



                var locationcount = 0;
                for (var location of this.Location) {
                  if (this.data.locationId == location.id) {
                    locationcount++;
                    this.service.form1.controls['LocationId'].setValue(this.data.locationId);
                    break;
                  }
                }
                if (locationcount == 0) {
                  this.service.form1.controls['LocationId'].setValue(null);
                }

              }




            });

            this.serialflag = 0;
          }
          this.serialnew == 1;
          this.flagComeFrom = true;
        }
        else if (res.status == 'Old') {
          this.serialnew == 1;
          this.ReceivedStatuslist = res.data;

          var recviedstatuscount = 0;
          for (var received of this.ReceivedStatuslist) {
            if (this.data.receviedStatusId == received.id) {
              recviedstatuscount++;
              this.service.form1.controls['ReceviedStatusId'].setValue(this.data.receviedStatusId);
              this.serialflag = 0;
              break;
            }
          }
          if (recviedstatuscount == 0) {
            this.selected = 2;
            this.service.form1.controls['ReceviedStatusId'].setValue(this.selected);
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.statusflag = 1;
            this.inventoryserv.GetLocations().subscribe(res => {
              if (res.status == true) {
                this.Location = res.data;
              }
            });
            this.inventoryserv.GetCategoryByTypeId(res.inventory.typeStatusId).subscribe(res => {

              if (res.status == true) {

                var categorycount = 0;
                for (var category of this.Category) {

                  if (category.id == 47 || category.id == 48 || category.id == 49) {
                    this.MetterHidden = true;
                    this.service.form1.controls['Meter'].setValidators([Validators.required]);
                    this.service.form1.controls['Meter'].updateValueAndValidity();
                  }
                  else {
                    this.MetterHidden = false;
                    this.service.form1.controls['Meter'].clearValidators();
                    this.service.form1.controls['Meter'].updateValueAndValidity();
                  }
                  if (category.id == 46) {
                    this.numberHidden = true;
                    this.service.form1.controls['Number'].setValidators([Validators.required]);
                    this.service.form1.controls['Number'].updateValueAndValidity();
                  }
                  else {
                    this.numberHidden = false;
                    this.service.form1.controls['Number'].clearValidators();
                    this.service.form1.controls['Number'].updateValueAndValidity();
                  }
                  if (res.data.id == category.id) {
                    this.Category1.pop();
                    this.Category1.push(category);

                    categorycount++;

                    this.service.form1.controls['CategoryId'].setValue(res.data.id);

                    break;
                  }
                }
                if (categorycount == 0) {

                  this.service.form1.controls['CategoryId'].setValue(null);
                }

              }




            });
            this.serialflag = 0;
          }
          this.serialnew == 1;
          this.FillFiledsForUsedSerial(res.inventory);
          this.flagComeFrom = false;

        }
        else {
          this.serialflag = 1;
          this.serialnew == 2;
          this.flagComeFrom = false;
        }

      }
    );
  }



  OnChangeReceivedName(event: any) {

    this.inventoryserv.GetLocations().subscribe(res => {

      if (res.status == true) {

        this.Location = res.data;



        var locationcount = 0;
        for (var location of this.Location) {
          if (this.data.locationId == location.id) {
            locationcount++;
            this.service.form1.controls['LocationId'].setValue(this.data.locationId);
            break;
          }
        }
        if (locationcount == 0) {
          this.service.form1.controls['LocationId'].setValue(null);
        }

      }




    });
  }

  OnChangeStatus(event: any) {
    this.rowHeig = "710px";

    if (event.value == 'وارد') {
      this.statusflag = 1;


    }

  }

  ontypeNameInputChange() {

    const searchInput = this.typeStatusSearch.nativeElement.value ?
      this.typeStatusSearch.nativeElement.value.toLowerCase() : '';


    this.TypeStatuslist = this._TypeStatuslist.filter(u => {

      const name: string = u.name.toLowerCase();

      return name.indexOf(searchInput) > -1;

    }
    );



  }
}
