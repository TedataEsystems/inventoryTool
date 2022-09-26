import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OutgoingStatusList } from 'src/app/Model/outgoing-status-list';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { OutgoingStatusService } from 'src/app/shared/service/outgoing-status.service';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit {

  isShowDiv = false;
  isNameRepeated: boolean = false;
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
  });
  Outgoing = {
    Id: 0,
    Name: "",
    CreatedBy: ""
  }
  outgoingStatusList: OutgoingStatusList[] = [];
  OutgoingStatusListTab?: OutgoingStatusList[] = [];
  valdata = ""; valuid = 0;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id', 'Name','CreationDate','CreatedBy','UpdateDate','UpdateBy', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.outgoingStatusList);
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title
    , private notser: NotificationService, private router: Router, private route: ActivatedRoute, private OutgoingStatusServ: OutgoingStatusService, private dailogService: DeleteService
  ) {
    this.titleService.setTitle('Outgoing');

  }
  TypeStatusName: string = '';
  TypeStatusId: number = 0;
 // show: boolean = false;
  loader: boolean = false;
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
    this.OutgoingStatusServ.getOutgoingStatus(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
      this.outgoingStatusList.push(...response?.data);
      this.outgoingStatusList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.outgoingStatusList);
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
    this.loader = true;
    this.OutgoingStatusServ.getOutgoingStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.outgoingStatusList = response?.data;
      this.outgoingStatusList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.outgoingStatusList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);
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
    this.Outgoing.Name = this.form.value.Name;
    this.Outgoing.Id = this.form.value.Id;
    this.Outgoing.CreatedBy =  localStorage.getItem('userName') || '';
    if (this.form.invalid || this.form.value.name == ' ') {
      if (this.form.value.name == ' ')
        this.setReactValue(Number(0), "");
      this.isDisable = false;
      return;
    }

    else {
      
      if (this.form.value.Id == 0 || this.form.value.Id == '' ) {
        this.isDisable = true;
        this.OutgoingStatusServ.AddOutgoingStatus(this.Outgoing).subscribe(res => {
          setTimeout(() => {
            this.loader = false;
          }, 1500)
          this.notser.success(":: add successfully");
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
          this.form['controls']['Id'].setValue(0);
          //   this.form.reset();

          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        },
          error => {
            setTimeout(() => {
              this.loader = false;
            }, 0)
            this.notser.warn(":: failed");
          }
        );
      }//if
      else {
        //not used
        this.OutgoingStatusServ.UpdateOutgoingStatus(this.Outgoing).subscribe(res => {
          setTimeout(() => {
            this.loader = false;
          }, 1500)
          this.notser.success(":: update successfully");
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
          this.form['controls']['Id'].setValue(0);
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        },
          error => {
            setTimeout(() => {
              this.loader = false;
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
  
    this.loader = true;
    let OutgoingStatusEdit: OutgoingStatusList =
    {
      id: row.id,
      name: row.name,
      CreatedBy:row.createdBy,
      CreationDate:row.creationDate,
      UpdatedBy: localStorage.getItem('userName') || ''
    }
    this.OutgoingStatusServ.UpdateOutgoingStatus(OutgoingStatusEdit).subscribe(res => {
      if (res.status == true) {
        setTimeout(() => {
          this.loader = false;
        }, 1500)
        this.notser.success(":: update successfully");
        this.LoadCompanyName();
        this.form['controls']['Name'].setValue('');
        this.form['controls']['Id'].setValue(0);
        //   this.form.reset();
        this.cancelEdit();
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }//if
      else {
        setTimeout(() => {
          this.loader = false;
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
    this.loader = true;
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
    this.OutgoingStatusServ.getOutgoingStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.outgoingStatusList.length = cursize;
        this.outgoingStatusList.push(...res?.data);
        this.outgoingStatusList.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.outgoingStatusList);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.loader = false;
      }
      else this.notser.success(":: add successfully");
    }, err => {
      this.notser.warn(":: failed");
      this.loader = false;

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
    this.Outgoing.Name = this.form.value.Name;
    this.Outgoing.Id = this.form.value.Id;
    this.OutgoingStatusServ.OutgoingStatusIsalreadysign(this.Outgoing.Name, this.Outgoing.Id).subscribe(
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
    let outgoingName = row.name;
    let outgoingId = row.id;
    this.OutgoingStatusServ.OutgoingStatusIsalreadysign(outgoingName, outgoingId).subscribe(
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
        this.OutgoingStatusServ.DeleteOutgoingStatus(r.id).subscribe(
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


}
