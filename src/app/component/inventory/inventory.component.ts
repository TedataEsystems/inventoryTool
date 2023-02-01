import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import {  ElementRef, Input,  TemplateRef } from '@angular/core';
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
import { ConfigureService } from 'src/app/shared/service/configure.service';
import {saveAs} from 'file-saver';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import { EditFormService } from 'src/app/shared/service/edit-form.service';
@Component({
  selector: 'app-inventory' ,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
InventoryList:Inventory[]=[];
TypeStatus: TypeStatus[] = [];
filteredOptions: any;
ReceivedStatus: ReceivedStatusList[] = [];
OutgoingStatus: OutgoingStatusList[] = [];
Category: Category[] = [];
ReceivedType: ReceviedType[] = [];
CompanyName: CompanyName[] = [];
Location: LocationName[] = [];
Acceptance: Acceptance[] = [];
isNotAdmin= false ;
//loader: boolean = false;
@ViewChild('typeStatusSearch') typeStatusSearch!: ElementRef;

valdata="";valuid=0;
listName:string ='';
R:string='وارد';
O:string='منصرف';
loading: boolean = true;
  searchKey:string ='' ;
  isTableExpanded = false;
  inventorySearch: InventorySearch = <InventorySearch>{};

  isFilterationData: Boolean = false;
  panelOpenState = false;
  appear=false;
  allow=false;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['all','Id', 'TypeStatusName', 'Comment','CustomerName','SerielNumber','OrderNumber','RecipientName',
  'Team','Status','ReceivedDate','ReceviedStatusName','ExpriyDate','OutgoingStatusName','CategoryName','CompanyName','ReceviedTypeName','AcceptanceName','LocationName','BR','ReorderingPoint','ItemCode','Meter','Number','CreationDate','CreatedBy','UpdateDate','UpdatedBy','action'];
  dataSource =new MatTableDataSource();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  team=  localStorage.getItem("userGroup");

  

  constructor(private dailogService:DeleteService,private loader: LoaderService,private titleService:Title, private note:NotificationService,private deleteService:DeleteService,private dialog: MatDialog, private route: ActivatedRoute, public service:EditFormService,
    private router: Router, private InventoryServ: InventoryService, private config: ConfigureService, private _bottomSheet: MatBottomSheet,private logserv:LogsService)

  {

    this.titleService.setTitle("Inventory");
    var teamval=  localStorage.getItem("userGroup");
    if(teamval?.toLocaleLowerCase() != 'admin'){
      this.isNotAdmin=true;  }

  }

  pageNumber = 1;
  pageSize =100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';

  // searchKey!:string;

  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    //debugger
    this.loader.busy();
    this.InventoryServ.getInventory(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      //console.log(response?.data)
      this.InventoryList = response?.data as Inventory[];
      this.InventoryList.length = response?.pagination.totalCount;
      //console.log("fromreqquest",this.InventoryList)

      this.dataSource = new MatTableDataSource<any>(this.InventoryList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;

    })

    this.InventoryServ.GettingLists().subscribe(res => {
      this.TypeStatus = res.typestatus as TypeStatus[];
      this.ReceivedStatus = res.recivedstatus as ReceivedStatusList[];
      this.OutgoingStatus = res.outgoingstatus as OutgoingStatusList[];
      this.Category = res.category as Category[];
      this.ReceivedType = res.recivedtype as ReceviedType[];
      this.Location = res.location as LocationName[];
      this.CompanyName = res.company as CompanyName[];
      this.Acceptance = res.acceptance as Acceptance[];
    });

    setTimeout(()=> this.loader.idle(),2000) ;
  }



  ngOnInit(){
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
     this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    }


    ///////delete admin
if(this.team=='Inventory_Hady' || this.team=='Inventory_User')
// if(this.team =='admin')
{
  this.allow=true;

}
else{
  this.allow=false;
}




  }
 



  

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

   removeAll: boolean = false;
  onSearchClear() {
    this.searchKey = '';
    this.changeSearckKey = true;
    this.onselectcheckall(this.removeAll);
    this.applyFilter();
  }
  changeSearckKey: boolean = false;

    applyFilter(){
      /*this.dataSource.filter=this.searchKey.trim().toLowerCase();*/
      if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
      {
        this.router.navigateByUrl('/login');
      }
      else{
        let searchData = this.searchKey.trim().toLowerCase();
        this.changeSearckKey = true;
        this.onselectcheckall(this.removeAll);
        this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
      }

    }


    onCreate(){
      if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
      {
        this.router.navigateByUrl('/login');
      }
      else{
       const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = { dialogTitle: "اضافة جديد" };
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = false;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog.open(AddComponent, dialogGonfig).afterClosed().subscribe(result => {
        if(this.service.formSearch.value==''){
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
        }else
        {
          this.AdvancedSearch();
        }
       // this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
     }
    }

    onEdit(row:any){
      if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
      {
        this.router.navigateByUrl('/login');
      }
      else{
       const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: " تعديل"};
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
       this.dialog.open(EditComponent,{panelClass:'modals-dialog',disableClose:true,autoFocus:true, width:"50%",data:row}).afterClosed()
       .subscribe(result => {
        if(this.service.formSearch.value==''){
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
        }else
        {
          this.AdvancedSearch();
        }
     
       
      
      });
        //this.form.reset();
       
       }

    }
    onDelete(row:any){

      if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
      {
        this.router.navigateByUrl('/login');
      }
      else{

      //this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
       // debugger;
        //if (res) {
          this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
            if (res) {
              //console.log("row"+row.id);
              this.InventoryServ.DeleteInventory(row.id).subscribe(
                rs => {
                  this.note.success(':: successfully Deleted');
                  if(this.service.formSearch.value==''){
                    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
                  }else
                  {
                    this.AdvancedSearch();
                  }
                 // this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
                  //  this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
                },
                error => { this.note.warn(':: An Error Occured') }
              );
            }
            else {
             // this.note.warn(':: An Error Occured')
            }
          });
        }

    //}
}
///////////////////////////GetLogs
GetLog(row:any){
  
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{ 
           
           
             this.logserv.SendLogId(row.id);
              this.router.navigateByUrl('/history');
          
             
      
  
  //}
  }
}

pageIn = 0;
previousSizedef = 100;
pagesizedef: number = 100;
public pIn: number = 0;

pageChanged(event: any) {
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
{
  this.router.navigateByUrl('/login');
}
else{
  this.pIn = event.pageIndex;
  this.pageIn = event.pageIndex;
  this.pagesizedef = event.pageSize;
  let pageIndex = event.pageIndex;
  let pageSize = event.pageSize;
  let previousSize = pageSize * pageIndex;
  this.previousSizedef = previousSize;
  this.getRequestdataNext(previousSize,  pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
}
}

getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.InventoryServ.getInventory(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.InventoryList.length = cursize;
        this.InventoryList.push(...res?.data);
        this.InventoryList.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.InventoryList);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;

      }
      else  this.note.success(":: add successfully");
    }, err => {
      this.note.warn(":: failed");


    })
    }

}

lastcol: string = 'Id';
lastdir: string = 'desc';

sortData(sort: any) {
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
  if (this.pIn != 0)
    window.location.reload();
  if (this.lastcol == sort.active && this.lastdir ==sort.direction) {
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
@ViewChild('LISTF') templateF!: TemplateRef<any>;
@ViewChild('fileInput') fileInput?: ElementRef;
@ViewChild('Msg') Msg!: TemplateRef<any>;
@ViewChild('data') data?: ElementRef;
fileAttr = 'Choose File';
fileAttrF = 'Choose File';
htmlToAdd: string = "";
fileuploaded: any;

exportExcel() {
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
  this.InventoryServ.DownloadAllDisplayDataOfExcel().subscribe(res => {

    const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
    const file = new File([blob], 'InventoryData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

    saveAs(file, 'InventoryData' + Date.now() + '.xlsx')

  }, err => {

    this.note.warn("! Fail")

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
  //console.log("img",imgFile.target.files[0])
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

    // Reset if duplicate image uploaded again
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

openBottomSheetMsg() {
  this._bottomSheet.open(this.Msg, {
    panelClass: 'msg-dialog-container',
    disableClose: true
  });
}

upLoadF() {
  //console.log("uploadF","param:",this.param,"fileUploaded:", this.fileuploaded)
  const fd = new FormData();
  fd.append(this.param, this.fileuploaded);
 // console.log("data to api",fd)
  this.InventoryServ.importExcelFile(fd).subscribe(res => {
    if (res.status == true) {
      if(this.service.formSearch.value==''){
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      }else
      {
        this.AdvancedSearch();
      }
     // this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      this.fileAttr = 'Choose File';
      this.resetfile();
      this._bottomSheet.dismiss();
      this.openBottomSheetMsg();
      this.htmlToAdd = res.data
    }
    else {
      this.openBottomSheetMsg();
       if(this.service.formSearch.value==''){
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      }else
      {
        this.AdvancedSearch();
      }
     // this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
      this.fileAttr = 'Choose File';
      this.resetfile();
      this.htmlToAdd = res.error;
    }
  }
    , error => {
      this.note.warn("!! Fail")
      this.resetfile();
    }
  );


}

ExportTOEmptyExcel()
{
  //debugger
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
  this.InventoryServ.ExportEmptyExcel().subscribe(res => {
    const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
    const file = new File([blob], 'Inventory' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
    saveAs(file, 'Inventory' + Date.now() + '.xlsx')

  }, err => {
    this.note.warn("! Fail")
  });
}
}


Ids: number[] = [];
// select all
isall: boolean = false;
selectedRows: boolean = false;
alll: boolean = false;

onselectcheckall(event: any) {
  if (event.checked || (this.changeSearckKey && event.checked)) {

    this.isall = true;
    this.alll = true;
    this.selectedRows = true;
    this.Ids = [];
    this.InventoryList.map(({ Id }) => this.Ids.push(Id));

  }

  else {
    //console.log("isall", this.isall);
   // console.log("hhh", event);
    this.Ids = [];
    this.selectedRows = false;
    this.alll = false;
    this.isall = false;
    //console.log(this.Ids, "idsssss");
    //console.log("all", this.alll);
    //console.log("isall", this.isall);

  }
}
onselectcheck(event: any, row: any) {

  
  if (event.checked) {
    this.selectedRows = true;
    this.Ids.push(row.id);
   // console.log(this.Ids);

  }

  else {
 //   this.selectedRows = true;
    for (let i = 0; i < this.Ids.length; i++) {
      if (this.Ids[i] == row.id) {
        this.Ids.splice(i, 1);
     //   console.log("after splice",this.Ids);
      }
    }
    if(this.Ids.length==0)
    {
      this.selectedRows = false;
    }
  }
  if (this.Ids.length == this.InventoryList.length) {
    this.alll = true;
    this.isall = true;

  }
  else{

    this.alll = false;
    if(this.Ids.length!=0)
    {
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
              console.log(this.Ids);
              this.note.success(' تم النعديل بنجاح');
              this.selectedRows = false;
              this.Ids = [];
              this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
              this.onSearchClear();
            }
            else {
              this.note.warn(':: An Error Occured')
            }

            // },
            // error => { this.note.warn(':: An Error Occured')
          }
          );
        
      
     
    }


    else {
      this.note.warn(" يجب ان تختار صفوف اولا");
    }




  }

  //
}
UpdateGroupToOutgoing() {

  if (localStorage.getItem("userName") == "" || localStorage.getItem("userName") == undefined || localStorage.getItem("userName") == null) {
    this.router.navigateByUrl('/login');
  }
  else {
    if (this.selectedRows == true) {

       

      this.InventoryServ.UpdateInventoryStatusToOutgoing(this.Ids).subscribe(res => {
        if (res.status == true) {
          console.log(this.Ids);
          this.note.success(' تم النعديل بنجاح');
          this.selectedRows = false;
          this.Ids = [];
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
          this.onSearchClear();
        }
        else {
          this.note.warn(':: An Error Occured')
        }

        // },
        // error => { this.note.warn(':: An Error Occured')
      }
      );
    
  
 
}


else {
  this.note.warn(" يجب ان تختار صفوف اولا");
}
  }

  //
}



////////advanced search
// form: FormGroup = new FormGroup({
//   CreatedDateFrom: new FormControl(''),
//   CreatedDateTo: new FormControl(''),
//   UpdatedDateFrom: new FormControl(''),
//   UpdatedDateTo: new FormControl(''),
//   ExpriyDateTo: new FormControl(''),
//   ExpriyDateFrom: new FormControl(''),
//   ReceivedDateTo: new FormControl(''),
//   ReceivedDateFrom: new FormControl(''),
//   CreatedBy: new FormControl(''),
//   UpdatedBy: new FormControl(''),
//   Comment: new FormControl(''),
//   Customername: new FormControl(''),
//   DeviceType: new FormControl(''),
//   OrderNumber: new FormControl(''),
//   ReorderingPoint: new FormControl(''),
//   BR: new FormControl(''),
//   ItemCode: new FormControl(''),
//   Meter: new FormControl(''),
//   Number: new FormControl(''),
//   SerielNumber: new FormControl(''),
//   RecipientName: new FormControl(''),
//   Team: new FormControl(''),
//   Status: new FormControl(''),
//   TypeStatusId: new FormControl(''),
//   ReceviedStatusId: new FormControl(''),
//   OutgoingStatusId: new FormControl(''),
//   CategoryId: new FormControl(''),
  
//   CompanyId: new FormControl(''),
//   ReceviedTypeId: new FormControl(''),
//   AcceptanceId: new FormControl(''),
//   LocationId: new FormControl(''),
// });


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
  this.inventorySearch.OrderNumber = Number(this.service.formSearch.value.OrderNumber);
  this.inventorySearch.ReorderingPoint = Number(this.service.formSearch.value.ReorderingPoint);
  this.inventorySearch.BR = Number(this.service.formSearch.value.BR);
  this.inventorySearch.ItemCode = Number(this.service.formSearch.value.ItemCode);
  this.inventorySearch.Meter = Number(this.service.formSearch.value.Meter);
  this.inventorySearch.Number = Number(this.service.formSearch.value.Number);
  this.inventorySearch.SerielNumber = this.service.formSearch.value.SerielNumber;
  this.inventorySearch.RecipientName = this.service.formSearch.value.RecipientName;
  this.inventorySearch.Team = this.service.formSearch.value.Team;
  this.inventorySearch.Status = this.service.formSearch.value.Status;

  this.inventorySearch.TypeStatusIDs =(this.service.formSearch.value.TypeStatusId);
  this.inventorySearch.ReceviedStatusIDs =(this.service.formSearch.value.ReceviedStatusId);
  this.inventorySearch.OutgoingStatusIDs =(this.service.formSearch.value.OutgoingStatusId);
  this.inventorySearch.CategoryIDs =(this.service.formSearch.value.CategoryId);
  this.inventorySearch.CompanyIDs =(this.service.formSearch.value.CompanyId);
  this.inventorySearch.ReceviedTypeIDs =(this.service.formSearch.value.ReceviedTypeId);
  this.inventorySearch.AcceptanceIDs =(this.service.formSearch.value.AcceptanceId);
  this.inventorySearch.LocationIDs =(this.service.formSearch.value.LocationId);
 

  this.InventoryServ.AdvancedSearch(this.inventorySearch).subscribe(res => {
    
    this.InventoryList = res as Inventory[];
    
    this.dataSource = new MatTableDataSource<any>(this.InventoryList);
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
   
   
    this.loader.idle();
  }
  )//subsribe
}//advanced

IntialValCreateBy: string = "";
  IntialValDate: string = "";
  clearAdvancedSearch() {
this.appear=false
    this.isFilterationData = false;
    this.service.formSearch.reset();
    this.IntialValCreateBy = "--اختار تعديل او اضافة--";
    this.IntialValDate="--  اختار التاريخ--";
    this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
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
  public _TypeStatusList: any[] = [];
  openAdvancedSearch() {
    this.panelOpenState = false;
    this.InventoryServ.GettingLists().subscribe(res => {
      if (res.status == true) {
        this.LocationList = res.location;
        this.CategoryList = res.category;
    
        this.CompanyNameList = res.companyName;
       
        this.OutgoingStatusList = res.outgoingStatus;
        ////////////
        this.ReceviedStatusList = res.receviedStatus;
        this.AcceptanceList = res.acceptance;
        this.ReceviedTypeList = res.receviedType;
        this.TypeStatusList = res.typeStatus;
       this._TypeStatusList=res.typeStatus;
      
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
    
    this.appear=true
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
ontypeNameInputChange(){
  
  const searchInput = this.typeStatusSearch.nativeElement.value ?
  this.typeStatusSearch.nativeElement.value.toLowerCase() : '' ;
  console.log("///////"+searchInput);
  console.log(this._TypeStatusList,"tttttttttttttttttttt")
  this.TypeStatusList = this._TypeStatusList.filter(u=> {
    console.log("UUUU"+u.name);
    const name : string= u.name.toLowerCase();
    console.log(name);
    return name.indexOf(searchInput) > -1 ;
    
}
  );



}



ExportExitPermitExcel() {
  
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
  {
    this.router.navigateByUrl('/login');
  }
  else{
debugger;
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
  this.inventorySearch.OrderNumber = Number(this.service.formSearch.value.OrderNumber);
  this.inventorySearch.ReorderingPoint = Number(this.service.formSearch.value.ReorderingPoint);
  this.inventorySearch.BR = Number(this.service.formSearch.value.BR);
  this.inventorySearch.ItemCode = Number(this.service.formSearch.value.ItemCode);
  this.inventorySearch.Meter = Number(this.service.formSearch.value.Meter);
  this.inventorySearch.Number = Number(this.service.formSearch.value.Number);
  this.inventorySearch.SerielNumber = this.service.formSearch.value.SerielNumber;
  this.inventorySearch.RecipientName = this.service.formSearch.value.RecipientName;
  this.inventorySearch.Team = this.service.formSearch.value.Team;
  this.inventorySearch.Status = this.service.formSearch.value.Status;

  this.inventorySearch.TypeStatusIDs =(this.service.formSearch.value.TypeStatusId);
  this.inventorySearch.ReceviedStatusIDs =(this.service.formSearch.value.ReceviedStatusId);
  this.inventorySearch.OutgoingStatusIDs =(this.service.formSearch.value.OutgoingStatusId);
  this.inventorySearch.CategoryIDs =(this.service.formSearch.value.CategoryId);
  this.inventorySearch.CompanyIDs =(this.service.formSearch.value.CompanyId);
  this.inventorySearch.ReceviedTypeIDs =(this.service.formSearch.value.ReceviedTypeId);
  this.inventorySearch.AcceptanceIDs =(this.service.formSearch.value.AcceptanceId);
  this.inventorySearch.LocationIDs =(this.service.formSearch.value.LocationId);
 
  this.InventoryServ.ExportExitPermitExcel(this.inventorySearch).subscribe(res => {

    const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
    const file = new File([blob], 'InventoryData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
   // const file = new File([res], 'InventoryData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
    saveAs(file, 'InventoryData' + Date.now() + '.xlsx')

  }, err => {

    this.note.warn("! Fail")

  });
  }
}

}