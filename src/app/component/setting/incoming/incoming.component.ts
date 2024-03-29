import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceivedStatusList } from 'src/app/Model/received-status-list';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { LoaderService } from 'src/app/shared/service/loader.service';

import { ReceviedStatusService } from 'src/app/shared/service/recevied-status.service';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css'],
})
export class IncomingComponent implements OnInit {
  isShowDiv = false;
  isNameRepeated: boolean = false;
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
  });
  Recevied = {
    Id: 0,
    Name: '',
    CreatedBy: '',
  };
  receviedStatusList: ReceivedStatusList[] = [];
  RecievedStatusListTab?: ReceivedStatusList[] = [];
  valdata = '';
  valuid = 0;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = [
    'Id',
    'Name',
    'CreationDate',
    'CreatedBy',
    'UpdateDate',
    'UpdateBy',
    'action',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.receviedStatusList);
  settingtype = '';

  editUsr: any;
  editdisabled: boolean = false;
  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private router: Router,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private RecievedStatusServ: ReceviedStatusService,
    private dailogService: DeleteService
  ) {
    this.titleService.setTitle('Recieved');
  }
  RecievedStatusName: string = '';
  RecievedStatusId: number = 0;
  // show: boolean = false;

  isDisabled = false;
  pageNumber = 1;
  pageSize = 100;
  iid: string = '';
  sortColumnDef: string = 'Id';
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';
  LoadCompanyName() {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.RecievedStatusServ.getRecviedStatus(
        this.pageNumber,
        this.pageSize,
        '',
        this.colname,
        this.coldir
      ).subscribe((response) => {
        this.receviedStatusList.push(...response?.data);
        this.receviedStatusList.length = response?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.receviedStatusList);
        this.dataSource.paginator = this.paginator as MatPaginator;
      });
    }
  }

  getRequestdata(
    pageNum: number,
    pageSize: number,
    search: string,
    sortColumn: string,
    sortDir: string
  ) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.loader.busy();
      this.RecievedStatusServ.getRecviedStatus(
        pageNum,
        pageSize,
        search,
        sortColumn,
        sortDir
      ).subscribe((response) => {
        this.receviedStatusList = response?.data;
        this.receviedStatusList.length = response?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.receviedStatusList);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;

        switch (
          this.receviedStatusList[0].id ||
          this.receviedStatusList[1].id
        ) {
          case 1 || 2:
            this.iid = 'n';
            break;
          default:
            this.iid = 'd';
            break;
        }
      });
      setTimeout(() => (this.loader.idle()), 2000);
    }
  }
  ngOnInit(): void {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.editUsr = 0;
      this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.searchKey = '';
      this.applyFilter();
    }
  }

  applyFilter() {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      let searchData = this.searchKey.trim().toLowerCase();
      this.getRequestdata(1, 100, searchData, this.sortColumnDef, 'asc');
    }
  }
  isDisable = false;
  onCreateUpdate() {
    this.isDisable = true;
    this.Recevied.Name = this.form.value.Name;
    this.Recevied.Id = this.form.value.Id;
    this.Recevied.CreatedBy = localStorage.getItem('userName') || '';
    if (this.form.invalid || this.form.value.name == ' ') {
      if (this.form.value.name == ' ') this.setReactValue(Number(0), '');
      this.isDisable = false;
      return;
    } else {
      if (this.form.value.Id == 0 || this.form.value.Id == '') {
        this.isDisable = true;
        this.RecievedStatusServ.AddReceviedStatus(this.Recevied).subscribe(
          (res) => {
            setTimeout(() => {
              this.loader.idle();
            }, 1500);
            this.toastr.success(':: add successfully');
            this.LoadCompanyName();
            this.form['controls']['Name'].setValue('');
            this.form['controls']['Id'].setValue(0);
            //   this.form.reset();

            this.getRequestdata(
              1,
              100,
              '',
              this.sortColumnDef,
              this.SortDirDef
            );
          },
          (error) => {
            setTimeout(() => {
              this.loader.idle();
            }, 0);
            this.toastr.warning(':: failed');
          }
        );
      } //if
      else {
        //not used
        this.RecievedStatusServ.UpdateReceviedStatus(this.Recevied).subscribe(
          (res) => {
            setTimeout(() => {
              this.loader.idle();
            }, 1500);
            this.toastr.success(':: update successfully');
            this.LoadCompanyName();
            this.form['controls']['Name'].setValue('');
            this.form['controls']['Id'].setValue(0);
            this.getRequestdata(
              1,
              100,
              '',
              this.sortColumnDef,
              this.SortDirDef
            );
          },
          (error) => {
            setTimeout(() => {
              this.loader.idle();
            }, 0);
            this.toastr.warning(':: failed');
          }
        );
      } //else
    }
    this.isShowDiv = false;
  } //end of

  editROw(r: any) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.editUsr = r.id;
      this.editdisabled = true;
    }
  }

  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    //this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }

  updateEdit(row: any) {
    this.loader.busy();
    let RecievedStatusEdit: ReceivedStatusList = {
      id: row.id,
      name: row.name,
      CreatedBy: row.createdBy,
      CreationDate: row.creationDate,
      UpdatedBy: localStorage.getItem('userName') || '',
    };
    this.RecievedStatusServ.UpdateReceviedStatus(RecievedStatusEdit).subscribe(
      (res) => {
        if (res.status == true) {
          setTimeout(() => {
            this.loader.idle();
          }, 1500);
          this.toastr.success(':: update successfully');
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
          this.form['controls']['Id'].setValue(0);
          //   this.form.reset();
          this.cancelEdit();
          this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        } //if
        else {
          setTimeout(() => {
            this.loader.idle();
          }, 0);
          this.toastr.warning(':: failed');
        }
      }
    );
  }
  pageIn = 0;
  previousSizedef = 100;
  pagesizedef: number = 100;
  public pIn: number = 0;

  pageChanged(event: any) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.loader.busy();
      this.pIn = event.pageIndex;
      this.pageIn = event.pageIndex;
      this.pagesizedef = event.pageSize;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      let previousSize = pageSize * pageIndex;
      this.previousSizedef = previousSize;
      this.getRequestdataNext(
        previousSize,
        pageIndex + 1,
        pageSize,
        '',
        this.sortColumnDef,
        this.SortDirDef
      );
    }
  }

  getRequestdataNext(
    cursize: number,
    pageNum: number,
    pageSize: number,
    search: string,
    sortColumn: string,
    sortDir: string
  ) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.RecievedStatusServ.getRecviedStatus(
        pageNum,
        pageSize,
        search,
        sortColumn,
        sortDir
      ).subscribe(
        (res) => {
          if (res.status == true) {
            this.receviedStatusList.length = cursize;
            this.receviedStatusList.push(...res?.data);
            this.receviedStatusList.length = res?.pagination.totalCount;
            this.dataSource = new MatTableDataSource<any>(
              this.receviedStatusList
            );
            this.dataSource._updateChangeSubscription();
            this.dataSource.paginator = this.paginator as MatPaginator;
            this.loader.idle();
          } else this.toastr.success(':: add successfully');
        },
        (err) => {
          this.toastr.warning(':: failed');
          this.loader.idle();
        }
      );
    }
  }
  lastcol: string = 'Id';
  lastdir: string = 'asc';
  sortData(sort: any) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      if (this.pIn != 0) window.location.reload();
      if (this.lastcol == sort.active && this.lastdir == sort.direction) {
        if (this.lastdir == 'asc') sort.direction = 'desc';
        else sort.direction = 'asc';
      }
      this.lastcol = sort.active;
      this.lastdir = sort.direction;
      var c = this.pageIn;
      this.getRequestdata(1, 100, '', sort.active, this.lastdir);
    }
  }
  onChecknameIsalreadysign() {
    this.Recevied.Name = this.form.value.Name;
    this.Recevied.Id = this.form.value.Id;
    this.RecievedStatusServ.ReceviedStatusIsalreadysign(
      this.Recevied.Name,
      this.Recevied.Id
    ).subscribe((res) => {
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
    let recievedName = row.name;
    let recievedId = row.id;
    this.RecievedStatusServ.ReceviedStatusIsalreadysign(
      recievedName,
      recievedId
    ).subscribe((res) => {
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
      Name: val,
    });
  }

  onDelete(r: any) {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.dailogService
        .openConfirmDialog()
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.RecievedStatusServ.DeleteReceviedStatus(r.id).subscribe(
              (rs) => {
                this.toastr.success(':: successfully Deleted');
                this.getRequestdata(
                  1,
                  100,
                  '',
                  this.sortColumnDef,
                  this.SortDirDef
                );
                //  this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
              },
              (error) => {
                this.toastr.warning(':: An Error Occured');
              }
            );
          } else {
            // this.toastr.warning(':: An Error Occured')
          }
        });
    }
  }

  toggleDisplay() {
    if (
      localStorage.getItem('userName') == '' ||
      localStorage.getItem('userName') == undefined ||
      localStorage.getItem('userName') == null
    ) {
      this.router.navigateByUrl('/login');
    } else {
      this.isShowDiv = !this.isShowDiv;
      // this.form['controls']['name'].setValue('');
      // this.form['controls']['id'].setValue(0);
    }
  }
}
