import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Input, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Inventory } from 'src/app/Model/inventory';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { EditComponent } from '../edit/edit.component';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/shared/service/inventory.service';
import { FavoriteSearchService } from 'src/app/shared/service/favorite-search.service';
import { ConfigureService } from 'src/app/shared/service/configure.service';
import { saveAs } from 'file-saver';
import { TypeStatus } from 'src/app/Model/type-status';
import { ReceivedStatusList } from 'src/app/Model/received-status-list';
import { OutgoingStatusList } from 'src/app/Model/outgoing-status-list';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { Category } from 'src/app/Model/category';
import { ReceviedType } from 'src/app/Model/recevied-type';
import { CompanyName } from 'src/app/Model/company-name';
import { Acceptance } from 'src/app/Model/acceptance';
import { LocationName } from 'src/app/Model/location';
import { InventorySearch } from 'src/app/Model/inventory-search';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AddComponent } from '../add/add.component';
import { LogsService } from 'src/app/shared/service/logs.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
import { Team } from 'src/app/Model/team';
import { RelocatLocationComponent } from '../relocat-location/relocat-location.component';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
declare var require: any;
const swal = require('sweetalert2')

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  InventoryList: Inventory[] = [];
  Ids2: number[] = [];
  TypeStatus: TypeStatus[] = [];
  Team: Team[] = [];
  filteredOptions: any;
  ReceivedStatus: ReceivedStatusList[] = [];
  OutgoingStatus: OutgoingStatusList[] = [];
  Category: Category[] = [];
  ReceivedType: ReceviedType[] = [];
  CompanyName: CompanyName[] = [];
  Location: LocationName[] = [];
  Acceptance: Acceptance[] = [];
  isNotAdmin = false;
  @ViewChild('typeStatusSearch') typeStatusSearch!: ElementRef;

  valdata = ""; valuid = 0;
  listName: string = '';
  R: string = 'وارد';
  O: string = 'منصرف';
  loading: boolean = true;
  searchKey: string = '';
  isTableExpanded = false;
  inventorySearch: InventorySearch = <InventorySearch>{};

  isFilterationData: Boolean = false;
  panelOpenState = false;
  appear = false;
  allow = false;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = ['all', 'Id', 'TypeStatusName', 'Comment', 'CustomerName', 'SerielNumber', 'OrderNumber', 'RecipientName',
    'TeamName', 'Status', 'ReceivedDate', 'ReceviedStatusName', 'ExpriyDate', 'OutgoingStatusName', 'CategoryName', 'CompanyName', 'ReceviedTypeName', 'AcceptanceName', 'LocationName', 'comeFrom', 'BR', 'ReorderingPoint', 'ItemCode', 'Meter', 'Number', 'CreationDate', 'CreatedBy', 'UpdateDate', 'UpdatedBy', 'action'];
  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  team = localStorage.getItem("userGroup");



  constructor(private dailogService: DeleteService, private loader: LoaderService, private titleService: Title,
    private toastr: ToastrService, private deleteService: DeleteService, private dialog: MatDialog, private route: ActivatedRoute, public service: EditFormService,
    private router: Router, private InventoryServ: InventoryService,
    private FavoriteSearchServ: FavoriteSearchService, private config: ConfigureService, private _bottomSheet: MatBottomSheet, private logserv: LogsService) {

    this.titleService.setTitle("Inventory");
    var teamval = localStorage.getItem("userGroup");
    if (teamval?.toLocaleLowerCase() != 'admin') {
      this.isNotAdmin = true;
    }

  }

  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';

  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader.busy();
    this.InventoryServ.getInventory(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.InventoryList = response?.data as Inventory[];
      this.InventoryList.length = response?.pagination.totalCount;
      this.Ids2 = [];
      for (var iny of this.InventoryList) {
        this.Ids2.push(iny?.id);
      }

      this.Ids = [];

      this.dataSource = new MatTableDataSource<any>(this.InventoryList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;

    })

    this.InventoryServ.GettingLists().subscribe(res => {
      this.TypeStatus = res.typestatus as TypeStatus[];
      this.Team = res.team as Team[];
      this.ReceivedStatus = res.recivedstatus as ReceivedStatusList[];
      this.OutgoingStatus = res.outgoingstatus as OutgoingStatusList[];
      this.Category = res.category as Category[];
      this.ReceivedType = res.recivedtype as ReceviedType[];
      this.Location = res.location as LocationName[];
      this.CompanyName = res.company as CompanyName[];
      this.Acceptance = res.acceptance as Acceptance[];
    });

    setTimeout(() => this.loader.idle(), 2000);
  }

  ngOnInit() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    }

    if (this.team == 'Inventory_Hady' || this.team == 'Inventory_User') {
      this.allow = true;
    }
    else {
      this.allow = false;
    }




  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  removeAll: boolean = false;
  onSearchClear() {
    this.searchKey = '';
    this.changeSearckKey = true;
    this.onselectcheckall(this.removeAll);
    this.applyFilter();
  }
  changeSearckKey: boolean = false;

  applyFilter() {
    /*this.dataSource.filter=this.searchKey.trim().toLowerCase();*/
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      let searchData = this.searchKey.trim().toLowerCase();
      this.changeSearckKey = true;
      this.onselectcheckall(this.removeAll);
      this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
    }

  }


  onCreate() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = { dialogTitle: "اضافة جديد" };
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = false;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog.open(AddComponent, dialogGonfig).afterClosed().subscribe(result => {
        if(result){
        this.service.initializeForm();
        if (this.service.formSearch.value == '') {
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
        } else {
          this.AdvancedSearch();
        }}
      });
    }
  }

  onEdit(row: any) {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = { dialogTitle: " تعديل" ,data: row };
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = "50%";
      dialogGonfig.height = "750px";
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog.open(EditComponent, { panelClass: 'modals-dialog', disableClose: true, autoFocus: true,height: "550px" ,width: "50%", data: row }).afterClosed()
        .subscribe(result => {
          if(result){
            if (this.service.formSearch.value != '') {
              this.AdvancedSearch();

            } else {
              this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
            }
          }

        });

    }

  }
  onDelete(row: any) {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
        if (res) {
          this.InventoryServ.DeleteInventory(row.id).subscribe(
            rs => {
              this.toastr.success(':: successfully Deleted');
              if (this.service.formSearch.value == '') {
                this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
              } else {
                this.AdvancedSearch();
              }
            },
            error => { this.toastr.warning(':: An Error Occured') }
          );
        }
        else {
        }
      });
    }

  }
  GetLog(row: any) {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {


      this.logserv.SendLogId(row.id);
      this.router.navigateByUrl('/inventorylogs');
    }
  }

  pageIn = 0;
  previousSizedef = 100;
  pagesizedef: number = 100;
  public pIn: number = 0;

  pageChanged(event: any) {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.pIn = event.pageIndex;
      this.pageIn = event.pageIndex;
      this.pagesizedef = event.pageSize;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      let previousSize = pageSize * pageIndex;
      this.previousSizedef = previousSize;
      if (this.service.formSearch.value == '') {
        this.getRequestdataNext(previousSize, pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
      } else {
        this.AdvancedSearch();
      }

    }
  }

  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.InventoryServ.getInventory(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
        if (res.status == true) {


          this.InventoryList.length = cursize;
          this.InventoryList.push(...res?.data);

          this.InventoryList.length = res?.pagination.totalCount;


          this.dataSource = new MatTableDataSource<any>(this.InventoryList);
          this.dataSource._updateChangeSubscription();
          this.dataSource.paginator = this.paginator as MatPaginator;

        }
        else this.toastr.success(":: add successfully");
      }, err => {
        this.toastr.warning(":: failed");


      })
    }

  }

  lastcol: string = 'Id';
  lastdir: string = 'desc';

  sortData(sort: any) {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      if (this.pIn != 0)
        window.location.reload();
      if (this.lastcol == sort.active && this.lastdir == sort.direction) {
        if (this.lastdir == 'asc')
          sort.direction = 'desc';
        else
          sort.direction = 'asc';
      }
      this.lastcol = sort.active; this.lastdir = sort.direction;
      var c = this.pageIn;
      this.getRequestdata(1, 100, '', sort.active, this.lastdir);
    }
  }

  @Input() param = 'file';
  @ViewChild('LIST') template!: TemplateRef<any>;
  @ViewChild('LISTWithLocation') templateWithLocation!: TemplateRef<any>;
  @ViewChild('LISTF') templateF!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild('Msg') Msg!: TemplateRef<any>;
  @ViewChild('data') data?: ElementRef;
  fileAttr = 'Choose File';
  fileAttrF = 'Choose File';
  htmlToAdd: string = "";
  fileuploaded: any;

  exportExcel() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.InventoryServ.DownloadAllDisplayDataOfExcel(this.Ids).subscribe(res => {

        const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        const file = new File([blob], 'InventoryData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

        saveAs(file, 'InventoryData' + Date.now() + '.xlsx')

      }, err => {

        this.toastr.warning("! Fail")

      });
    }
  }

  close() {
    this.resetfile();
    this._bottomSheet.dismiss();
  }
  resetfile() {
    this.fileAttr = 'Choose File';
  }



  uploadFileEvtF(imgFile: any) {
    this.fileuploaded = imgFile.target.files[0];
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.prototype.forEach.call(imgFile.target.files, (file) => {
        this.fileAttr += file.name + ' - ';
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      (this.fileInput as ElementRef).nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  closeMsg() {
    this._bottomSheet.dismiss();
  }
  openBottomSheet() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this._bottomSheet.open(this.template, {
        panelClass: 'botttom-dialog-container',
        disableClose: true
      });
    }
  }
  openBottomSheetWithLocation() {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this._bottomSheet.open(this.templateWithLocation, {
        panelClass: 'botttom-dialog-container',
        disableClose: true
      });
    }
  }

  openBottomSheetMsg() {
    this._bottomSheet.open(this.Msg, {
      panelClass: 'msg-dialog-container',
      disableClose: true
    });
  }

  upLoadF() {
    const fd = new FormData();
    fd.append(this.param, this.fileuploaded);
    this.InventoryServ.importExcelFile(fd).subscribe(res => {
      if (res.status == true) {
        if (this.service.formSearch.value == '') {
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        } else {
          this.AdvancedSearch();
        }
        this.fileAttr = 'Choose File';
        this.resetfile();
        this._bottomSheet.dismiss();
        this.openBottomSheetMsg();
        this.htmlToAdd = res.data
      }
      else {
        this.openBottomSheetMsg();
        if (this.service.formSearch.value == '') {
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        } else {
          this.AdvancedSearch();
        }
        this.fileAttr = 'Choose File';
        this.resetfile();
        this.htmlToAdd = res.error;
      }
    }
      , error => {
        this.toastr.warning("!! Fail")
        this.resetfile();
      }
    );


  }
  upLoadFWithLocation() {
    const fd = new FormData();
    fd.append(this.param, this.fileuploaded);

    this.InventoryServ.importExcelFileWithLocation(fd).subscribe(res => {
      if (res.status == true) {
        if (this.service.formSearch.value == '') {
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        } else {
          this.AdvancedSearch();
        }

        this.fileAttr = 'Choose File';
        this.resetfile();
        this._bottomSheet.dismiss();
        this.openBottomSheetMsg();
        this.htmlToAdd = res.data + res.success
      }
      else {
        this.openBottomSheetMsg();
        if (this.service.formSearch.value == '') {
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        } else {
          this.AdvancedSearch();
        }

        this.fileAttr = 'Choose File';
        this.resetfile();
        this.htmlToAdd = res.error;
      }
    }
      , error => {
        this.toastr.warning("!! Fail")
        this.resetfile();
      }
    );
  }
  ExportTOEmptyExcel() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.InventoryServ.ExportEmptyExcel().subscribe(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        const file = new File([blob], 'Inventory' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file, 'Inventory' + Date.now() + '.xlsx')

      }, err => {
        this.toastr.warning("! Fail")
      });
    }
  }
  Ids: number[] = [];
  isall: boolean = false;
  selectedRows: boolean = false;
  alll: boolean = false;

  onselectcheckall(event: any) {

    if (event.checked || (this.changeSearckKey && event.checked)) {

      this.isall = true;
      this.alll = true;
      this.selectedRows = true;
      this.Ids = [];
      this.Ids = this.Ids2;
    }

    else {
      this.Ids = [];
      this.selectedRows = false;
      this.alll = false;
      this.isall = false;
    }
  }
  onselectcheck(event: any, row: any) {


    if (event.checked) {
      this.selectedRows = true;
      this.Ids.push(row.id);
    }

    else {
      for (let i = 0; i < this.Ids.length; i++) {
        if (this.Ids[i] == row.id) {
          this.Ids.splice(i, 1);
        }
      }
      if (this.Ids.length == 0) {
        this.selectedRows = false;
      }
    }
    if (this.Ids.length == this.InventoryList.length) {
      this.alll = true;
      this.isall = true;

    }
    else {

      this.alll = false;
      if (this.Ids.length != 0) {
        this.selectedRows = true;
      }
    }


  }

  UpdateGroupToRecevied() {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {


      if (this.selectedRows == true) {



        this.InventoryServ.UpdateInventoryStatusToRecevied(this.Ids).subscribe(res => {
          if (res.status == true) {

            this.toastr.success(' تم النعديل بنجاح');
            this.selectedRows = false;
            this.Ids = [];
            this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
            this.onSearchClear();
          }
          else {
            this.toastr.warning(':: An Error Occured')
          }
        }
        );

      }
      else {
        this.toastr.warning(" يجب ان تختار صفوف اولا");
      }
    }
  }
  UpdateGroupToOutgoing() {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      if (this.selectedRows == true) {



        this.InventoryServ.UpdateInventoryStatusToOutgoing(this.Ids).subscribe(res => {
          if (res.status == true) {

            this.toastr.success(' تم النعديل بنجاح');
            this.selectedRows = false;
            this.Ids = [];
            this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
            this.onSearchClear();
          }
          else {
            this.toastr.warning(':: An Error Occured')
          }

          // },
          // error => { this.toastr.warning(':: An Error Occured')
        }
        );

      }

      else {
        this.toastr.warning(" يجب ان تختار صفوف اولا");
      }
    }

    //
  }
  AdvancedSearch() {

    this.isFilterationData = true;
    this.panelOpenState = true;
    this.loader.busy();
    this.inventorySearch.CreatedDateFrom = this.service.formSearch.value.CreatedDateFrom == "" ? null : this.service.formSearch.value.CreatedDateFrom;
    this.inventorySearch.CreatedDateTo = this.service.formSearch.value.CreatedDateTo == "" ? null : this.service.formSearch.value.CreatedDateTo;
    //
    this.inventorySearch.UpdatedDateFrom = this.service.formSearch.value.UpdatedDateFrom == "" ? null : this.service.formSearch.value.UpdatedDateFrom;
    this.inventorySearch.UpdatedDateTo = this.service.formSearch.value.UpdatedDateTo == "" ? null : this.service.formSearch.value.UpdatedDateTo;
    //
    this.inventorySearch.ExpriyDateFrom = this.service.formSearch.value.ExpriyDateFrom == "" ? null : this.service.formSearch.value.ExpriyDateFrom;
    this.inventorySearch.ExpriyDateTo = this.service.formSearch.value.ExpriyDateTo == "" ? null : this.service.formSearch.value.ExpriyDateTo;
    //
    this.inventorySearch.ReceivedDateFrom = this.service.formSearch.value.ReceivedDateFrom == "" ? null : this.service.formSearch.value.ReceivedDateFrom;
    this.inventorySearch.ReceivedDateTo = this.service.formSearch.value.ReceivedDateTo == "" ? null : this.service.formSearch.value.ReceivedDateTo;
    //
    this.inventorySearch.CreatedBy = this.service.formSearch.value.CreatedBy;
    this.inventorySearch.UpdatedBy = this.service.formSearch.value.UpdatedBy;
    this.inventorySearch.Comment = this.service.formSearch.value.Comment;
    this.inventorySearch.Comment = this.service.formSearch.value.Comment;
    this.inventorySearch.Customername = this.service.formSearch.value.Customername;
    this.inventorySearch.DeviceType = this.service.formSearch.value.DeviceType;
    this.inventorySearch.OrderNumber = this.service.formSearch.value.OrderNumber;
    this.inventorySearch.ReorderingPoint = this.service.formSearch.value.ReorderingPoint;
    this.inventorySearch.BR = this.service.formSearch.value.BR;
    this.inventorySearch.ItemCode = this.service.formSearch.value.ItemCode;
    this.inventorySearch.Meter = this.service.formSearch.value.Meter;
    this.inventorySearch.Number = this.service.formSearch.value.Number;
    this.inventorySearch.SerielNumber = this.service.formSearch.value.SerielNumber;
    this.inventorySearch.RecipientName = this.service.formSearch.value.RecipientName;
    this.inventorySearch.TeamIDs = (this.service.formSearch.value.TeamId);
    this.inventorySearch.Status = this.service.formSearch.value.Status;
    this.inventorySearch.RemoveDuplicate = this.service.formSearch.get('RemoveDuplicate')?.value;
    this.inventorySearch.TypeStatusIDs = (this.service.formSearch.value.TypeStatusId);
    this.inventorySearch.ReceviedStatusIDs = (this.service.formSearch.value.ReceviedStatusId);
    this.inventorySearch.OutgoingStatusIDs = (this.service.formSearch.value.OutgoingStatusId);
    this.inventorySearch.CategoryIDs = (this.service.formSearch.value.CategoryId);
    this.inventorySearch.CompanyIDs = (this.service.formSearch.value.CompanyId);
    this.inventorySearch.ReceviedTypeIDs = (this.service.formSearch.value.ReceviedTypeId);
    this.inventorySearch.AcceptanceIDs = (this.service.formSearch.value.AcceptanceId);
    this.inventorySearch.LocationIDs = (this.service.formSearch.value.LocationId);


    this.InventoryServ.AdvancedSearch(this.inventorySearch).subscribe(res => {

      this.InventoryList = res as Inventory[];
      this.Ids2 = [];
      for (var iny of res) {
        this.Ids2.push(iny.id);
      }
      this.dataSource = new MatTableDataSource<any>(this.InventoryList);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort as MatSort;



      this.loader.idle();
    }
    )
  }
  SaveFavoriteSearch() {

    this.isFilterationData = true;
    this.panelOpenState = true;
    this.loader.busy();
    this.inventorySearch.CreatedDateFrom = this.service.formSearch.value.CreatedDateFrom == "" ? null : this.service.formSearch.value.CreatedDateFrom;
    this.inventorySearch.CreatedDateTo = this.service.formSearch.value.CreatedDateTo == "" ? null : this.service.formSearch.value.CreatedDateTo;
    this.inventorySearch.UpdatedDateFrom = this.service.formSearch.value.UpdatedDateFrom == "" ? null : this.service.formSearch.value.UpdatedDateFrom;
    this.inventorySearch.UpdatedDateTo = this.service.formSearch.value.UpdatedDateTo == "" ? null : this.service.formSearch.value.UpdatedDateTo;
    this.inventorySearch.ExpriyDateFrom = this.service.formSearch.value.ExpriyDateFrom == "" ? null : this.service.formSearch.value.ExpriyDateFrom;
    this.inventorySearch.ExpriyDateTo = this.service.formSearch.value.ExpriyDateTo == "" ? null : this.service.formSearch.value.ExpriyDateTo;
    //
    this.inventorySearch.ReceivedDateFrom = this.service.formSearch.value.ReceivedDateFrom == "" ? null : this.service.formSearch.value.ReceivedDateFrom;
    this.inventorySearch.ReceivedDateTo = this.service.formSearch.value.ReceivedDateTo == "" ? null : this.service.formSearch.value.ReceivedDateTo;
    //
    this.inventorySearch.CreatedBy = this.service.formSearch.value.CreatedBy;
    this.inventorySearch.UpdatedBy = this.service.formSearch.value.UpdatedBy;
    this.inventorySearch.Comment = this.service.formSearch.value.Comment;
    this.inventorySearch.Comment = this.service.formSearch.value.Comment;
    this.inventorySearch.Customername = this.service.formSearch.value.Customername;
    this.inventorySearch.DeviceType = this.service.formSearch.value.DeviceType;
    this.inventorySearch.OrderNumber = this.service.formSearch.value.OrderNumber;
    this.inventorySearch.ReorderingPoint = this.service.formSearch.value.ReorderingPoint;
    this.inventorySearch.BR = this.service.formSearch.value.BR;
    this.inventorySearch.ItemCode = this.service.formSearch.value.ItemCode;
    this.inventorySearch.Meter = this.service.formSearch.value.Meter;
    this.inventorySearch.Number = this.service.formSearch.value.Number;
    this.inventorySearch.SerielNumber = this.service.formSearch.value.SerielNumber;
    this.inventorySearch.RecipientName = this.service.formSearch.value.RecipientName;
    this.inventorySearch.TeamIDs = (this.service.formSearch.value.TeamId);
    this.inventorySearch.Status = this.service.formSearch.value.Status;

    this.inventorySearch.ActionType = this.service.formSearch.value.ActionType;
    this.inventorySearch.DateType = this.service.formSearch.value.DateType;
    this.inventorySearch.TypeStatusIDs = (this.service.formSearch.value.TypeStatusId);
    this.inventorySearch.ReceviedStatusIDs = (this.service.formSearch.value.ReceviedStatusId);
    this.inventorySearch.OutgoingStatusIDs = (this.service.formSearch.value.OutgoingStatusId);
    this.inventorySearch.CategoryIDs = (this.service.formSearch.value.CategoryId);
    this.inventorySearch.CompanyIDs = (this.service.formSearch.value.CompanyId);
    this.inventorySearch.ReceviedTypeIDs = (this.service.formSearch.value.ReceviedTypeId);
    this.inventorySearch.AcceptanceIDs = (this.service.formSearch.value.AcceptanceId);
    this.inventorySearch.LocationIDs = (this.service.formSearch.value.LocationId);


    this.FavoriteSearchServ.AddEditFavoriteSearch(this.inventorySearch).subscribe(res => {


      this.toastr.success(':: Submitted successfully');

      this.loader.idle();
    }
    )
  }
  IntialValCreateBy: string = "";
  IntialValDate: string = "";
  clearAdvancedSearch() {
    this.Ids2 = [];
    this.appear = false
    this.isFilterationData = false;
    this.service.formSearch.reset();
    this.IntialValCreateBy = "--اختار تعديل او اضافة--";
    this.IntialValDate = "--  اختار التاريخ--";
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  //get lists
  public LocationList: LocationName[] = [];
  public CategoryList: Category[] = [];
  public CompanyNameList: CompanyName[] = [];
  public OutgoingStatusList: OutgoingStatusList[] = [];
  public ReceviedStatusList: ReceivedStatusList[] = [];
  public AcceptanceList: Acceptance[] = [];
  public ReceviedTypeList: ReceviedType[] = [];
  public TypeStatusList: TypeStatus[] = [];
  public TeamList: Team[] = [];
  public _TypeStatusList: any[] = [];
  openAdvancedSearch() {
    this.panelOpenState = false;
    this.InventoryServ.GettingLists().subscribe(res => {
      if (res.status == true) {
        this.LocationList = res.location;
        this.CategoryList = res.category;
        this.CompanyNameList = res.companyName;
        this.OutgoingStatusList = res.outgoingStatus;
        this.ReceviedStatusList = res.receviedStatus;
        this.AcceptanceList = res.acceptance;
        this.ReceviedTypeList = res.receviedType;
        this.TypeStatusList = res.typeStatus;
        this.TeamList = res.team;
        this._TypeStatusList = res.typeStatus;

      }
    })
  }
  by: boolean = true;
  selectedValue(event: MatSelectChange) {

    if (event.value == "CreatedBy") {
      this.by = true;
      this.service.formSearch['controls']['UpdatedBy'].setValue('');

    }
    else if (event.value == "UpdatedBy") {
      this.by = false;

      this.service.formSearch['controls']['CreatedBy'].setValue('');

    }
  }
  dateType: number = 1;
  selectedValueOfDate(event: MatSelectChange) {

    this.appear = true
    if (event.value == "ExpriyDate") {
      this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
      this.service.formSearch['controls']['CreatedDateTo'].setValue('');
      this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
      this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
      this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
      this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
      this.dateType = 2;

    }
    else if
      (event.value == "UpdatedDate") {
      this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
      this.service.formSearch['controls']['CreatedDateTo'].setValue('');
      this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
      this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
      this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
      this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
      this.dateType = 4;

    }
    else if (event.value == "CreatedDate") {
      this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
      this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
      this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
      this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
      this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
      this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
      this.dateType = 3;

    }
    else if (event.value == "ReceivedDate") {
      this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
      this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
      this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
      this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
      this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
      this.service.formSearch['controls']['CreatedDateTo'].setValue('');
      this.dateType = 1;

    }
  }
  ///////////////////////////////////////////
  ontypeNameInputChange() {

    const searchInput = this.typeStatusSearch.nativeElement.value ?
      this.typeStatusSearch.nativeElement.value.toLowerCase() : '';


    this.TypeStatusList = this._TypeStatusList.filter(u => {

      const name: string = u.name.toLowerCase();

      return name.indexOf(searchInput) > -1;

    }
    );



  }
  ExportExitPermitExcel(e: Event) {

    e.stopPropagation();


    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      let invSearch: InventorySearch = <InventorySearch>{};

      invSearch.CreatedDateFrom = this.service.formSearch.value.CreatedDateFrom == "" ? null : this.service.formSearch.value.CreatedDateFrom;
      invSearch.CreatedDateTo = this.service.formSearch.value.CreatedDateTo == "" ? null : this.service.formSearch.value.CreatedDateTo;
      invSearch.UpdatedDateFrom = this.service.formSearch.value.UpdatedDateFrom == "" ? null : this.service.formSearch.value.UpdatedDateFrom;
      invSearch.UpdatedDateTo = this.service.formSearch.value.UpdatedDateTo == "" ? null : this.service.formSearch.value.UpdatedDateTo;
      invSearch.ExpriyDateFrom = this.service.formSearch.value.ExpriyDateFrom == "" ? null : this.service.formSearch.value.ExpriyDateFrom;
      invSearch.ExpriyDateTo = this.service.formSearch.value.ExpriyDateTo == "" ? null : this.service.formSearch.value.ExpriyDateTo;
      invSearch.ReceivedDateFrom = this.service.formSearch.value.ReceivedDateFrom == "" ? null : this.service.formSearch.value.ReceivedDateFrom;
      invSearch.ReceivedDateTo = this.service.formSearch.value.ReceivedDateTo == "" ? null : this.service.formSearch.value.ReceivedDateTo;
      invSearch.CreatedBy = this.service.formSearch.value.CreatedBy == "" ? null : this.service.formSearch.value.CreatedBy;
      invSearch.UpdatedBy = this.service.formSearch.value.UpdatedBy == "" ? null : this.service.formSearch.value.UpdatedBy;
      invSearch.Comment = this.service.formSearch.value.Comment == "" ? null : this.service.formSearch.value.Comment;
      invSearch.Customername = this.service.formSearch.value.Customername == "" ? null : this.service.formSearch.value.Customername;
      invSearch.DeviceType = this.service.formSearch.value.DeviceType == "" ? null : this.service.formSearch.value.DeviceType;
      // invSearch.OrderNumber = this.service.formSearch.value.OrderNumber == 0 ? null : this.service.formSearch.value.OrderNumber;
      invSearch.OrderNumber = this.service.formSearch.value.OrderNumber == "" ? null : this.service.formSearch.value.OrderNumber;
      invSearch.ReorderingPoint = this.service.formSearch.value.ReorderingPoint == 0 ? null : this.service.formSearch.value.ReorderingPoint;
      invSearch.BR = this.service.formSearch.value.BR == 0 ? null : this.service.formSearch.value.BR;
      invSearch.ItemCode = this.service.formSearch.value.ItemCode == "" ? null : this.service.formSearch.value.ItemCode;
      invSearch.Meter = this.service.formSearch.value.Meter == 0 ? null : this.service.formSearch.value.Meter;
      invSearch.Number = this.service.formSearch.value.Number == 0 ? null : this.service.formSearch.value.Number;
      invSearch.SerielNumber = this.service.formSearch.value.SerielNumber == "" ? null : this.service.formSearch.value.SerielNumber;
      invSearch.RecipientName = this.service.formSearch.value.RecipientName == "" ? null : this.service.formSearch.value.RecipientName;
      invSearch.TeamIDs = this.service.formSearch.value.TeamId == "" ? null : this.service.formSearch.value.TeamId;
      invSearch.Status = this.service.formSearch.value.Status == "" ? null : this.service.formSearch.value.Status;

      if (this.Ids.length == 0) {

        invSearch.IDs == null;
      } else {
        invSearch.IDs = this.Ids;
      }

      invSearch.TypeStatusIDs = this.service.formSearch.value.TypeStatusId == "" ? null : this.service.formSearch.value.TypeStatusId;
      invSearch.ReceviedStatusIDs = this.service.formSearch.value.ReceviedStatusId == "" ? null : this.service.formSearch.value.ReceviedStatusId;
      invSearch.OutgoingStatusIDs = this.service.formSearch.value.OutgoingStatusId == "" ? null : this.service.formSearch.value.OutgoingStatusId;
      invSearch.CategoryIDs = this.service.formSearch.value.CategoryId == "" ? null : this.service.formSearch.value.CategoryId;
      invSearch.CompanyIDs = this.service.formSearch.value.CompanyId == "" ? null : this.service.formSearch.value.CompanyId;
      invSearch.ReceviedTypeIDs = this.service.formSearch.value.ReceviedTypeId == "" ? null : this.service.formSearch.value.ReceviedTypeId;
      invSearch.AcceptanceIDs = this.service.formSearch.value.AcceptanceId == "" ? null : this.service.formSearch.value.AcceptanceId;
      invSearch.LocationIDs = this.service.formSearch.value.LocationId == "" ? null : this.service.formSearch.value.LocationId;


      if (invSearch.LocationIDs == null && invSearch.AcceptanceIDs == null && invSearch.ReceviedStatusIDs == null && invSearch.CompanyIDs == null
        && invSearch.CategoryIDs == null && invSearch.OutgoingStatusIDs == null && invSearch.ReceviedStatusIDs == null && invSearch.TypeStatusIDs == null
        && invSearch.IDs == null && invSearch.Status == null && invSearch.TeamIDs == null && invSearch.RecipientName == null
        && invSearch.SerielNumber == null && invSearch.Number == null && invSearch.Meter == null && invSearch.ItemCode == null
        && invSearch.BR == null && invSearch.ReorderingPoint == null && invSearch.OrderNumber == null
        && invSearch.Customername == null && invSearch.Comment == null
        && invSearch.UpdatedBy == null && invSearch.CreatedBy == null && invSearch.ReceivedDateFrom == null
        && invSearch.ReceivedDateTo == null && invSearch.ExpriyDateTo == null && invSearch.ExpriyDateFrom == null
        && invSearch.CreatedDateTo == null && invSearch.CreatedDateFrom == null && invSearch.UpdatedDateTo == null
        && invSearch.UpdatedDateFrom == null
      ) {
        swal.fire('من فضلك اختار بعض العناصر ');
      }
      else {

        this.InventoryServ.ExportExitPermitExcel(invSearch).subscribe(res => {

          const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
          const file = new File([blob], 'تصريح _الخروج' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

          saveAs(file, 'تصريح _الخروج' +formatDate(new Date(), 'yyyy/MM/dd', 'en') + '.xlsx');

          this.selectedRows = false;

          invSearch.IDs = [];
          /////////////////////

          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
          this.onSearchClear();
          this.Ids = [];
          this.Ids2 = [];
        }, err => {

          this.toastr.warning("! Fail")

        });
      }
    }
  }
  GetFavoriteSearch() {

    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.FavoriteSearchServ.GetFavoriteSearch().subscribe(res => {
        if (res.status) {



          if (res.data.customerName != null) {
            this.service.formSearch.controls['Customername'].setValue(res.data.customerName);
          }
          if (res.data.orderNumber != null) {
            this.service.formSearch.controls['OrderNumber'].setValue(res.data.orderNumber);
          }
          if (res.data.reorderingPoint != null) {
            this.service.formSearch.controls['ReorderingPoint'].setValue(res.data.reorderingPoint);
          }
          if (res.data.br != null) {
            this.service.formSearch.controls['BR'].setValue(res.data.br);
          }
          if (res.data.itemCode != null) {
            this.service.formSearch.controls['ItemCode'].setValue(res.data.itemCode);
          }
          if (res.data.dateType != null) {
            this.service.formSearch.controls['DateType'].setValue(res.data.dateType);
          }
          if (res.data.actionType != null) {
            this.service.formSearch.controls['ActionType'].setValue(res.data.actionType);
          }
          if (res.data.userAction != null) {

            // if(res.data.actionType =='CreatedBy')
            //  {
            this.service.formSearch.controls['CreatedBy'].setValue(res.data.userAction);
            // }else{
            //   this.service.formSearch.controls['UpdatedBy'].setValue(res.data.userAction);
            //  }
          }
          if (res.data.serielNumber != null) {
            this.service.formSearch.controls['SerielNumber'].setValue(res.data.serielNumber);
          }
          if (res.data.recipientName != null) {
            this.service.formSearch.controls['RecipientName'].setValue(res.data.recipientName);
          }
          if (res.data.teamIDs != null) {


            this.service.formSearch.controls['TeamId'].setValue(res.data.teamIDs);


          }
          if (res.data.receviedStatusIDs != null) {


            this.service.formSearch.controls['ReceviedStatusId'].setValue(res.data.receviedStatusIDs);


          }
          if (res.data.outgoingStatusIDs != null) {




            this.service.formSearch.controls['OutgoingStatusId'].setValue(res.data.outgoingStatusIDs);


          }
          if (res.data.receviedTypeIDs != null) {


            this.service.formSearch.controls['ReceviedTypeId'].setValue(res.data.receviedTypeIDs);


          }

          if (res.data.typeStatusIDs != null) {


            this.service.formSearch.controls['TypeStatusId'].setValue(res.data.typeStatusIDs);


          }

          if (res.data.categoryIDs != null) {


            this.service.formSearch.controls['CategoryId'].setValue(res.data.categoryIDs);


          }

          if (res.data.companyIDs != null) {


            this.service.formSearch.controls['CompanyId'].setValue(res.data.companyIDs);


          }
          if (res.data.locationIDs != null) {


            this.service.formSearch.controls['LocationId'].setValue(res.data.locationIDs);


          }
          if (res.data.acceptanceIDs != null) {


            this.service.formSearch.controls['AcceptanceId'].setValue(res.data.acceptanceIDs);


          }
          if (res.data.status != null) {
            this.service.formSearch.controls['Status'].setValue(res.data.status);
          }

          if (res.data.comment != null) {
            this.service.formSearch.controls['Comment'].setValue(res.data.comment);
          }
          if (res.data.receivedDateFrom != null) {
            this.appear = true;
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.dateType = 1;
            this.service.formSearch.controls['ReceivedDateFrom'].setValue(res.data.receivedDateFrom);
          }
          if (res.data.receivedDateTo != null) {
            this.appear = true;
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.dateType = 1;
            this.service.formSearch.controls['ReceivedDateTo'].setValue(res.data.receivedDateTo);
          }
          if (res.data.expriyDateFrom != null) {
            this.appear = true;
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 2;
            this.service.formSearch.controls['ExpriyDateFrom'].setValue(res.data.expriyDateFrom);
          }
          if (res.data.expriyDateTo != null) {
            this.appear = true;
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 2;
            this.service.formSearch.controls['ExpriyDateTo'].setValue(res.data.expriyDateTo);
          }
          if (res.data.createdDateFrom != null) {
            this.appear = true;
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 3;
            this.service.formSearch.controls['CreatedDateFrom'].setValue(res.data.createdDateFrom);
          }
          if (res.data.createdDateTo != null) {
            this.appear = true;
            this.service.formSearch['controls']['UpdatedDateFrom'].setValue('');
            this.service.formSearch['controls']['UpdatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 3;
            this.service.formSearch.controls['CreatedDateTo'].setValue(res.data.createdDateTo);
          }
          if (res.data.updatedDateFrom != null) {
            this.appear = true;
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 4;
            this.service.formSearch.controls['UpdatedDateFrom'].setValue(res.data.updatedDateFrom);
          }
          if (res.data.updatedDateTo != null) {
            this.appear = true;
            this.service.formSearch['controls']['CreatedDateFrom'].setValue('');
            this.service.formSearch['controls']['CreatedDateTo'].setValue('');
            this.service.formSearch['controls']['ExpriyDateFrom'].setValue('');
            this.service.formSearch['controls']['ExpriyDateTo'].setValue('');
            this.service.formSearch['controls']['ReceivedDateFrom'].setValue('');
            this.service.formSearch['controls']['ReceivedDateTo'].setValue('');
            this.dateType = 4;
            this.service.formSearch.controls['UpdatedDateTo'].setValue(res.data.updatedDateTo);
          }
          this.AdvancedSearch();
        }


      }, err => {

        this.toastr.warning("!fail");

      });
    }
  }
  updateLocations(row:any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = row;
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
     dialogGonfig.width = "30%";
      dialogGonfig.height = "300px";
      dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(RelocatLocationComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {
        if(result){
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }
      });
  }

  ExportTOEmptyExcelWithLocation() {
    if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.InventoryServ.ExportEmptyExcelWithLocation().subscribe(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        const file = new File([blob], 'Inventory' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file, 'Inventory' + Date.now() + '.xlsx')

      }, err => {
        this.toastr.warning("! Fail")
      });
    }
  }
}
