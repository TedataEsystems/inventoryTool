import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import { Team } from 'src/app/Model/team';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  rowHeig = '';
  dialogTitle: string = '';
  appear: boolean = false;
  isHidden: boolean = false;
  outgoingisHidden: boolean = false;
  subitem: boolean = false;
  subitem1: boolean = false;
  hidden: boolean = true;
  hidden1: boolean = true;
  hidden11: number = 0;
  isDisable = false;
  CustomerNamehidden: boolean = true;
  CustomerNamehidden1: number = 0;
  RecipientNamehidden: boolean = true;
  RecipientNamehidden1: number = 0;
  OrderNumberhidden: boolean = true;
  OrderNumberhidden1: number = 0;
  TeamIdhidden: boolean = true;
  TeamIdhidden1: number = 0;
  TypeStatusIdhidden: boolean = true;
  TypeStatusIdhidden1: number = 0;
  CompanyIdhidden: boolean = true;
  CompanyIdhidden1: number = 0;
  ReceivedDatehidden: boolean = true;
  ReceivedDatehidden1: number = 0;
  outgoinghidden1: boolean = true;
  outgoinghidden11: number = 0;
  MetterHidden: boolean = false;
  numberHidden: boolean = false;
  selected = 0;
  TypeStatuslist: TypeStatus[] = [];
  Teamlist: Team[] = [];
  ReceivedStatuslist: ReceivedStatusList[] = [];
  OutgoingStatuslist: OutgoingStatusList[] = [];
  Category: Category[] = [];
  Category1: Category[] = [];
  ReceviedType: ReceviedType[] = [];
  CompanyName: CompanyName[] = [];
  Location: LocationName[] = [];
  Acceptance: Acceptance[] = [];
  serialreq: number = 0;
  flag: boolean = false;
  statusflag: number = 0;
  serialflag: number = 0;
  iid: number = 0;
  SerialNumber: string = '';
  flagh: boolean = false;
  SearchForm: boolean = false;
  @ViewChild('typeStatusSearch') typeStatusSearch!: ElementRef;
  constructor(
    public inventoryserv: InventoryService,
    private loader: LoaderService,
    public service: EditFormService,
    public dialogRef: MatDialogRef<EditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.service.form;
    if (localStorage.getItem('userGroup') == 'Inventory_Hady') {
      this.flagh = true;
    }

    if (this.data.dialogTitle !== 'اضافة جديد') {
      this.dialogTitle = 'تعديل';
      this.flag = true;
    } else {
      this.dialogTitle = this.data.dialogTitle;
    }

    if (this.data) {
      if (this.data.subItem) {
        this.subitem = this.data.subItem;
        this.subitem1 = this.data.subItem;
      }

      this.service.form.controls['Id'].setValue(this.data.id);
      this.service.form.controls['CustomerName'].setValue(
        this.data.customerName
      );
      this.service.form.controls['OrderNumber'].setValue(this.data.orderNumber);
      this.service.form.controls['ReorderingPoint'].setValue(
        this.data.reorderingPoint
      );
      this.service.form.controls['BR'].setValue(this.data.br);
      this.service.form.controls['ItemCode'].setValue(this.data.itemCode);
      this.service.form.controls['Meter'].setValue(this.data.meter);
      this.service.form.controls['Number'].setValue(this.data.number);
      this.service.form.controls['SerielNumber'].setValue(
        this.data.serielNumber
      );
      this.service.form.controls['RecipientName'].setValue(
        this.data.recipientName
      );
      this.service.form.controls['Status'].setValue(this.data.status);
      this.service.form.controls['Comment'].setValue(this.data.comment);
      this.service.form.controls['ReceivedDate'].setValue(
        this.data.receivedDate
      );
      this.service.form.controls['ExpriyDate'].setValue(this.data.expriyDate);
      this.service.form.controls['CreatedBy'].setValue(this.data.createdBy);
      this.service.form.controls['CreationDate'].setValue(
        this.data.creationDate
      );
      this.service.form.controls['comeFrom'].setValue(this.data.comeFrom);
    }

    this.GettingLists();


    if (this.service.form.controls['Status'].value == 'وارد') {
      this.statusflag = 1;
      this.rowHeig = '720px';
    } else if (this.service.form.controls['Status'].value == 'منصرف') {
      this.statusflag = 2;
      this.rowHeig = '600px';
    } else {
      this.rowHeig = '450px';
      this.statusflag == 0;
    }
  }






  GettingLists() {
    this.inventoryserv.GettingLists().subscribe((res) => {
      if (res.status == true) {
        this.TypeStatuslist = res.typeStatus;
        this.Teamlist = res.team;
        this.ReceivedStatuslist = res.receviedStatus;
        this.OutgoingStatuslist = res.outgoingStatus;
        this.Category = res.category;
        this.ReceviedType = res.receviedType;
        this.Location = res.location;
        this.CompanyName = res.companyName;
        this.Acceptance = res.acceptance;
        if (this.data) {

          if (this.TypeStatuslist.length > 0) {
            this.service.form.controls['TypeStatusId'].setValue(
              this.data.typeStatusId
            );
          }
          if (this.Teamlist.length > 0) {
            this.service.form.controls['TeamId'].setValue(this.data.teamId);
          }

          if (this.OutgoingStatuslist.length > 0) {
            this.service.form.controls['OutgoingStatusId'].setValue(
              this.data.outgoingStatusId
            );
            this.outgoingtoggle();
          }

          if (this.ReceivedStatuslist.length > 0) {
            this.service.form.controls['ReceviedStatusId'].setValue(
              this.data?.receviedStatusId
            );
          }
if(this.Category.length > 0){
  for (var category of this.Category) {
    if (this.data.categoryId == category.id) {
      this.Category1.push(category);
      if (category.id == 46 || category.id == 47 || category.id == 48) {
        this.MetterHidden = true;

      } else {
        this.MetterHidden = false;
      }


      this.service.form.controls['CategoryId'].setValue(
        this.data.categoryId
      );


    }
  }

}
if(this.CompanyName.length > 0){
  this.service.form.controls['CompanyId'].setValue(
    this.data.companyId
  );
}


if(this.Location.length > 0){
  this.service.form.controls['LocationId'].setValue(
    this.data.locationId
  );
}if(this.Acceptance.length > 0){
  this.service.form.controls['AcceptanceId'].setValue(
    this.data.acceptanceId
  );
}
if(this.ReceviedType.length > 0){
  this.service.form.controls['ReceviedTypeId'].setValue(
    this.data.receviedTypeId
  );
  this.toggle();
}

        }

        this.GetCategoryByTypeId()
      } else {
        this.toastr.warning(':: error');
      }
    });
  }

  GetCategoryByTypeId() {
    this.inventoryserv
      .GetCategoryByTypeId(this.data.typeStatusId)
      .subscribe((res) => {
        if (res.status == true) {


          for (var category of this.Category1) {

            if (category.id == 45 || category.id == 63) {
              this.numberHidden = true;
            } else {
              this.numberHidden = false;
            }
            if (this.data.categoryId == category.id) {

              this.service.form.controls['CategoryId'].setValue(category.id);

            }
          }

        }
      });
  }

  onClear() {
    this.service.form.reset();

    this.service.initializeFormGroup();
  }
  toggle() {
    this.isHidden = !this.isHidden;
  }
  outgoingtoggle() {
    this.outgoingisHidden = !this.outgoingisHidden;
  }
  onSubmit() {
    this.isDisable = true;
    let inventory = {
      CustomerName: this.service.form.value.CustomerName,
      OrderNumber: this.service.form.value.OrderNumber,
      ReorderingPoint: this.service.form.value.ReorderingPoint,
      BR: this.service.form.value.BR,
      ItemCode: this.service.form.value.ItemCode,
      Meter: this.service.form.value.Meter,
      Number: this.service.form.value.Number,
      SerielNumber: this.service.form.value.SerielNumber,
      RecipientName: this.service.form.value.RecipientName,
      TeamId: this.service.form.value.TeamId,
      Team: this.service.form.value.Team,
      Status: this.service.form.value.Status,
      ReceivedDate: this.service.form.value.ReceivedDate,
      ExpriyDate: this.service.form.value.ExpriyDate,
      Comment: this.service.form.value.Comment,
      TypeStatusId: this.service.form.value.TypeStatusId,
      TypeStatus: this.service.form.value.TypeStatus,
      ReceviedStatusId: this.service.form.value.ReceviedStatusId,
      receviedStatus: this.service.form.value.ReceviedStatus,
      OutgoingStatusId: this.service.form.value.OutgoingStatusId,
      OutgoingStatusName: this.service.form.value.OutgoingStatus,
      CategoryId: this.service.form.value.CategoryId,
      CategoryName: this.service.form.value.Category,
      CompanyId: this.service.form.value.CompanyId,
      CompanyName: this.service.form.value.CompanyName,
      LocationId: this.service.form.value.LocationId,
      LocationName: this.service.form.value.LocationName,
      ReceviedTypeId: this.service.form.value.ReceviedTypeId,
      ReceviedTypeName: this.service.form.value.ReceviedType,
      AcceptanceId: this.service.form.value.AcceptanceId,
      AcceptanceName: this.service.form.value.Acceptance,
      CreationDate: this.service.form.value.CreationDate,
      CreatedBy: this.service.form.value.CreatedBy,
      comeFrom: this.service.form1.value.comeFrom,
    };

    if (
      inventory.CategoryId != 45 &&
      inventory.CategoryId != 46 &&
      inventory.CategoryId != 47 &&
      inventory.CategoryId != 48 &&
      inventory.CategoryId != 63
    ) {
      if (inventory.SerielNumber == null || inventory.SerielNumber == '') {
        this.serialreq = 1;
        this.isDisable = false;
        return;
      }
    }
    if (!this.service.form.valid) {
      this.isDisable = false;
      return;
    }
    if (this.serialflag == 1) {
      this.isDisable = false;
      return;
    }
    if (inventory.Status == 'منصرف') {
      if (inventory.ExpriyDate == null) {
        this.hidden1 = !this.hidden1;
        this.hidden11 = 1;
      } else {
        this.hidden11 = 0;
      }
      if (inventory.OutgoingStatusId == null) {
        this.outgoinghidden1 = !this.outgoinghidden1;
        this.outgoinghidden11 = 1;
      } else {
        this.outgoinghidden11 = 0;
      }
      if (inventory.CustomerName == null || inventory.CustomerName == '') {
        this.CustomerNamehidden = !this.CustomerNamehidden;
        this.CustomerNamehidden1 = 1;
      } else {
        this.CustomerNamehidden1 = 0;
      }

      if (inventory.RecipientName == null || inventory.RecipientName == '') {
        this.RecipientNamehidden = !this.RecipientNamehidden;
        this.RecipientNamehidden1 = 1;
      } else {
        this.RecipientNamehidden1 = 0;
      }

      if (inventory.OrderNumber == null) {
        this.OrderNumberhidden = !this.OrderNumberhidden;
        this.OrderNumberhidden1 = 1;
      } else {
        this.OrderNumberhidden1 = 0;
      }

      if (inventory.TeamId == null) {
        this.TeamIdhidden = !this.TeamIdhidden;
        this.TeamIdhidden1 = 1;
      } else {
        this.TeamIdhidden1 = 0;
      }

      if (inventory.TypeStatusId == null) {
        this.TypeStatusIdhidden = !this.TypeStatusIdhidden;
        this.TypeStatusIdhidden1 = 1;
      } else {
        this.TypeStatusIdhidden1 = 0;
      }

      if (inventory.CompanyId == null) {
        this.CompanyIdhidden = !this.CompanyIdhidden;
        this.CompanyIdhidden1 = 1;
      } else {
        this.CompanyIdhidden1 = 0;
      }

      if (
        this.CustomerNamehidden1 == 1 ||
        this.hidden11 == 1 ||
        this.RecipientNamehidden1 == 1 ||
        this.outgoinghidden11 == 1 ||
        this.OrderNumberhidden1 == 1 ||
        this.TeamIdhidden1 == 1 ||
        this.TypeStatusIdhidden1 == 1 ||
        this.CompanyIdhidden1 == 1
      ) {
        this.isDisable = false;
        this.loader.idle();
        return;
      } else {
        this.service.form.controls['UpdatedBy'].setValue(
          localStorage.getItem('userName') || ''
        );

        this.inventoryserv
          .UpdateInventory(this.service.form.value)
          .subscribe((res) => {
            if (res.status == 'true') {
              this.toastr.success(':: Updated successfully');
              this.service.form.reset();
              this.isDisable = false;
              this.loader.idle();
              this.dialogRef.close('save');
            } else {
              if (res.status == 'type') {
                this.serialflag = 3;
                this.isDisable = false;
              } else if (res.status == 'metergreat') {
                this.serialflag = 4;
              } else if (res.status == 'numbergreat') {
                this.serialflag = 5;
              } else {
                this.toastr.warning(':: Failed');
                this.loader.idle();
              }
            }
          });
      }
    } else {
      if (inventory.ReceivedDate == null) {
        this.isDisable = false;
        this.ReceivedDatehidden = !this.ReceivedDatehidden;
        this.loader.idle();
        return;
      }
      this.service.form.controls['UpdatedBy'].setValue(
        localStorage.getItem('userName') || ''
      );

      this.inventoryserv
        .UpdateInventory(this.service.form.value)
        .subscribe((res) => {
          if (res.status == 'true') {
            this.toastr.success(':: Updated successfully');
            this.service.form.reset();
            this.isDisable = false;
            this.loader.idle();
            this.dialogRef.close('save');
          } else {
            if (res.status == 'type') {
              this.serialflag = 3;
            } else if (res.status == 'metergreat') {
              this.serialflag = 4;
            } else if (res.status == 'numbergreat') {
              this.serialflag = 5;
            } else {
              this.toastr.warning(':: Failed');
              this.loader.idle();
            }
          }
        });
    }

    this.isDisable = false;

    this.loader.idle();
  }
  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }
  change() {
    this.hidden1 = true;
  }
  changhide() {
    this.hidden = true;
  }

  OnChangePopName(event: any) {
    this.inventoryserv.GetCategoryByTypeId(event.value).subscribe((res) => {
      if (res.status == true) {
        var categorycount = 0;
        for (var category of this.Category) {
          if (category.id == 47 || category.id == 48 || category.id == 49) {
            this.MetterHidden = true;

          } else {
            this.MetterHidden = false;
          }
          if (category.id == 45 || category.id == 63) {
            this.numberHidden = true;

          } else {
            this.numberHidden = false;
          }
          if (res.data.id == category.id) {
            this.Category1.pop();
            this.Category1.push(category);
            categorycount++;
            this.service.form.controls['CategoryId'].setValue(res.data.id);

            break;
          }
        }
        if (categorycount == 0) {
          this.service.form.controls['CategoryId'].setValue(null);
        }
      }
    });
  }
  OnChangeStatus(event: any) {
    if (event.value == 'وارد') {
      this.statusflag = 1;
      this.rowHeig = '720px';
    } else {
      this.statusflag = 2;
      this.rowHeig = '600px';
    }
  }

  onCheckSerialIsalreadysign() {
    this.SerialNumber = this.service.form.value.SerielNumber;
    this.iid = this.service.form.value.Id;
    this.inventoryserv
      .SerielNumberIsAlreadySignedInEdit(this.SerialNumber, this.iid)
      .subscribe((res) => {
        if (res.status == 'New') {
          this.ReceivedStatuslist = res.data;
          var recviedstatuscount = 0;
          for (var received of this.ReceivedStatuslist) {
            if (this.data.receviedStatusId == received.id) {
              recviedstatuscount++;
              this.service.form1.controls['ReceviedStatusId'].setValue(
                this.data.receviedStatusId
              );
              this.serialflag = 0;
              break;
            }
          }
          if (recviedstatuscount == 0) {
            this.selected = 1;
            this.service.form1.controls['ReceviedStatusId'].setValue(
              this.selected
            );
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.statusflag = 1;
            this.inventoryserv.GetLocations().subscribe((res) => {
              if (res.status == true) {
                this.Location = res.data;

                var locationcount = 0;
                for (var location of this.Location) {
                  if (this.data.locationId == location.id) {
                    locationcount++;
                    this.service.form1.controls['LocationId'].setValue(
                      this.data.locationId
                    );
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
        } else if (res.status == 'Same') {
          this.ReceivedStatuslist = res.data;
          var recviedstatuscount = 0;
          for (var received of this.ReceivedStatuslist) {
            if (this.data.receviedStatusId == received.id) {
              recviedstatuscount++;
              this.service.form1.controls['ReceviedStatusId'].setValue(
                this.data.receviedStatusId
              );
              this.serialflag = 0;
              break;
            }
          }
          if (recviedstatuscount == 0) {
            this.selected = 1;
            this.statusflag = 1;
            this.serialflag = 0;
          }
        } else if (res.status == 'Old') {
          this.ReceivedStatuslist = res.data;

          var recviedstatuscount = 0;
          for (var received of this.ReceivedStatuslist) {
            if (this.data.receviedStatusId == received.id) {
              recviedstatuscount++;
              this.service.form1.controls['ReceviedStatusId'].setValue(
                this.data.receviedStatusId
              );
              this.serialflag = 0;
              break;
            }
          }
          if (recviedstatuscount == 0) {
            this.selected = 2;
            this.service.form1.controls['ReceviedStatusId'].setValue(
              this.selected
            );
            this.service.form1.controls['Status'].setValue('وارد');
            this.OnChangeStatus('وارد');
            this.statusflag = 1;
            this.inventoryserv.GetLocations().subscribe((res) => {
              if (res.status == true) {
                this.Location = res.data;

                var locationcount = 0;
                for (var location of this.Location) {
                  if (this.data.locationId == location.id) {
                    locationcount++;
                    this.service.form1.controls['LocationId'].setValue(
                      this.data.locationId
                    );
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
        } else {
          this.serialflag = 1;
        }
      });
  }

  OnChangeReceivedName(event: any) {
    this.inventoryserv.GetLocations().subscribe((res) => {
      if (res.status == true) {
        this.Location = res.data;

        var locationcount = 0;
        for (var location of this.Location) {
          if (this.data.locationId == location.id) {
            locationcount++;
            this.service.form.controls['LocationId'].setValue(
              this.data.locationId
            );
            break;
          }
        }
        if (locationcount == 0) {
          this.service.form.controls['LocationId'].setValue(null);
        }
      }
    });
  }
  ontypeNameInputChange() {
    const searchInput = this.typeStatusSearch.nativeElement.value
      ? this.typeStatusSearch.nativeElement.value.toLowerCase()
      : '';

    this.TypeStatuslist = this.TypeStatuslist.filter((u) => {
      const name: string = u.name.toLowerCase();

      return name.indexOf(searchInput) > -1;
    });
  }

  onLocationChange(event: any) {}
}
