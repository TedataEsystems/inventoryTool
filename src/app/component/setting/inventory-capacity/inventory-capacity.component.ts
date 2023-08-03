import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationName } from 'src/app/Model/location';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { InventoryCapacityService } from 'src/app/shared/service/inventory-capacity.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { AddInventoyCapacityComponent } from '../../add-inventoy-capacity/add-inventoy-capacity.component';

@Component({
  selector: 'app-inventory-capacity',
  templateUrl: './inventory-capacity.component.html',
  styleUrls: ['./inventory-capacity.component.css']
})
export class InventoryCapacityComponent implements OnInit {
  isShowDiv = false;
  isNameRepeated: boolean = false;
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
    DevicesNumber : new FormControl('', [Validators.required])
  });
  InventoryCapacity = {
    Id: 0,
    Name: "",
    devicesNumber : "",
    CreatedBy: ""
  }

  InventoryCapacityList: any[] = [];
  LocationListTab?: LocationName[] = [];
  valdata = ""; valuid = 0;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id', 'Name','devicesNumber','CreationDate','CreatedBy','UpdateDate','UpdateBy', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.InventoryCapacityList);
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;


  constructor(private titleService: Title,
    private dialog: MatDialog,
     private notser: NotificationService, private router: Router, private loader: LoaderService,private route: ActivatedRoute, private inventoryCapacityServices: InventoryCapacityService, private dailogService: DeleteService
  ) {
    this.titleService.setTitle('Location');

  }
  LocationName: string = '';
  LocationId: number = 0;
 // show: boolean = false;
  //loader: boolean = false;
  isDisabled = false;
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';


  LoadCompanyName() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.inventoryCapacityServices.GetInventoryCapacity(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
      this.InventoryCapacityList.push(...response?.data);
      this.InventoryCapacityList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.InventoryCapacityList);
      this.dataSource.paginator = this.paginator as MatPaginator;

    })
  }
  }

  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {

    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.loader.busy();;
    this.inventoryCapacityServices.GetInventoryCapacity(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.InventoryCapacityList = response?.data;
      console.log( this.InventoryCapacityList)
      this.InventoryCapacityList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.InventoryCapacityList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader.idle(), 2000);
  }
  }




   ngOnInit(): void {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.editUsr = 0;
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);}
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.searchKey = '';
    this.applyFilter();}
  }

  applyFilter() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    let searchData = this.searchKey.trim().toLowerCase();
    this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");}
  }
  isDisable = false;


  onCreateUpdate() {

    this.isDisable = true;
    this.InventoryCapacity.Name = this.form.value.Name;
    this.InventoryCapacity.devicesNumber= this.form.value.devicesNumber;
    this.InventoryCapacity.Id = this.form.value.Id;
    this.InventoryCapacity.CreatedBy =  localStorage.getItem('userName') || '';
    if (this.form.invalid || this.form.value.name == ' ') {
      if (this.form.value.name == ' ')
        this.setReactValue(Number(0), "");
      this.isDisable = false;
      return;
    }

    else {

      if (this.form.value.Id == 0 || this.form.value.Id == '' ) {
        this.isDisable = true;
        this.inventoryCapacityServices.AddInventoryCapacity(this.InventoryCapacity).subscribe(res => {
          setTimeout(() => {
            this.loader.idle();
          }, 1500)
          this.notser.success(":: add successfully");
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
          this.form['controls']['DevicesNumber'].setValue('');
          this.form['controls']['Id'].setValue(0);
          //   this.form.reset();

          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        },
          error => {
            setTimeout(() => {
              this.loader.idle();
            }, 0)
            this.notser.warn(":: failed");
          }
        );
      }//if
      else {
        //not used
        this.inventoryCapacityServices.UpdateInventoryCapacity(this.InventoryCapacity).subscribe(res => {
          setTimeout(() => {
            this.loader.idle();
          }, 1500)
          this.notser.success(":: update successfully");
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
          this.form['controls']['DevicesNumber'].setValue('');
          this.form['controls']['Id'].setValue(0);
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        },
          error => {
            setTimeout(() => {
              this.loader.idle();
            }, 0)
            this.notser.warn(":: failed");
          }
        )
      }//else

  }
    this.isShowDiv = false;
  }//end of


  editROw(r: any) {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.editUsr = r.id;
    this.editdisabled = true;}

  }

  cancelEdit() {

    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }

  updateEdit(row: any) {

    this.loader.busy();;
    let LocationEdit: LocationName =
    {
      id: row.id,
      name: row.name,
      CreatedBy:row.createdBy,
      CreationDate:row.creationDate,
      UpdatedBy: localStorage.getItem('userName') || ''
    }
    this.inventoryCapacityServices.UpdateInventoryCapacity(LocationEdit).subscribe(res => {
      if (res.status == true) {
        setTimeout(() => {
          this.loader.idle();
        }, 1500)
        this.notser.success(":: update successfully");
        this.LoadCompanyName();
        this.form['controls']['Name'].setValue('');
        this.form['controls']['DevicesNumber'].setValue('');
        this.form['controls']['Id'].setValue(0);
        //   this.form.reset();
        this.cancelEdit();
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }//if
      else {
        setTimeout(() => {
          this.loader.idle();
        }, 0)
        this.notser.warn(":: failed");
      }

    })
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
    this.loader.busy();;
    this.pIn = event.pageIndex;
    this.pageIn = event.pageIndex;
    this.pagesizedef = event.pageSize;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.previousSizedef = previousSize;
    this.getRequestdataNext(previousSize, pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);}
  }
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {


    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.inventoryCapacityServices.GetInventoryCapacity(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.InventoryCapacityList.length = cursize;
        this.InventoryCapacityList.push(...res?.data);
        this.InventoryCapacityList.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.InventoryCapacityList);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.loader.idle();
      }
      else this.notser.success(":: add successfully");
    }, err => {
      this.notser.warn(":: failed");
      this.loader.idle();

    })

  }
  }
  lastcol: string = 'Id';
  lastdir: string = 'asc';
  sortData(sort: any) {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
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
  onChecknameIsalreadysign() {
    this.InventoryCapacity.Name = this.form.value.Name;
    this.InventoryCapacity.devicesNumber = this.form.value.devicesNumber;
    this.InventoryCapacity.Id = this.form.value.Id;
    this.inventoryCapacityServices.InventoryCapacityIsAlreadySigned(this.InventoryCapacity.Name, this.InventoryCapacity.Id).subscribe(
      res => {
        if (res.status == true) {
          this.isDisabled = false;
          this.isNameRepeated = false;


        } else {
          this.isDisabled = true;
          this.isNameRepeated = true;

        }
      });
  }


  onChecknameIsalreadysignWhenUpdate(row: any) {
    let inventoryName = row.name;
    let inventoryId = row.id;
    this.inventoryCapacityServices.InventoryCapacityIsAlreadySigned(inventoryName, inventoryId).subscribe(
      res => {
        if (res.status == true) {
          this.isDisabled = false;
          this.isNameUpdatedRepeated = false;
        } else {
          this.isDisabled = true;
          this.isNameUpdatedRepeated = true;
        }
      });
  }


  setReactValue(id: number, val: any) {
    this.form.patchValue({
      Id: id,
      Name: val

    });

  }

  onDelete(r: any) {
    //debugger
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.inventoryCapacityServices.DeleteInventoryCapacity(r.id).subscribe(
          rs => {
            this.notser.success(':: successfully Deleted');
            this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
            //  this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
          },
          error => { this.notser.warn(':: An Error Occured') }
        );
      }
      else {
       // this.notser.warn(':: An Error Occured')
      }
    });
  }
  }


  toggleDisplay() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
      this.isShowDiv = !this.isShowDiv;
      // this.form['controls']['name'].setValue('');
      // this.form['controls']['id'].setValue(0);

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
    dialogGonfig.height = "300px";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(AddInventoyCapacityComponent, dialogGonfig).afterClosed().subscribe(result => {
      //this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      window.location.reload();
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
    dialogGonfig.autoFocus = false;
    dialogGonfig.width = "50%";
    dialogGonfig.height = "300px";
    dialogGonfig.panelClass ='confirm';
     this.dialog.open(AddInventoyCapacityComponent,{panelClass:'confirm',disableClose:true,autoFocus:false, width:"50%",data:row})
     .afterClosed().subscribe(result => {
      window.location.reload();
    });
      


     }

  }

}