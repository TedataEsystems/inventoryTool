import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Logs } from 'src/app/Model/logs';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { LogsService } from 'src/app/shared/service/logs.service';
import { EditComponent } from '../edit/edit.component';
import { ToastrService } from 'ngx-toastr';
import { LogsDetailsComponent } from '../logs-details/logs-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HistoryListComponent implements OnInit {
  isShowDiv = false;


  logsList:Logs[]=[];
  logsListTab?:Logs[]=[];
  valdata="";valuid=0;
    searchKey:string ='';
    listName:string ='';
    loading: boolean = true;
    isTableExpanded = false;

    @ViewChild(MatPaginator) paginator?: MatPaginator;
    @ViewChild(MatSort) sort?: MatSort;
    displayedColumns: string[] = ['Id' ,'ElementId',  'ActionType', 'UserName','CreationDate','Descirption'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    dataSource = new MatTableDataSource(this.logsList);
    settingtype=''


    constructor(private titleService:Title, private loader: LoaderService,private dialog: MatDialog,
      private toastr:ToastrService,private router: Router,private route: ActivatedRoute, private LogsServ:LogsService
      ) {
        this.titleService.setTitle('logs');

    }

    typestatus: string = '';
    typestatusId: number = 0;
    show: boolean = false;
    //loader:boolean=false;
    isDisabled = false;
    pageNumber = 1;
    pageSize =100;
    sortColumnDef: string = "Id";
    SortDirDef: string = 'desc';
    public colname: string = 'Id';
    public coldir: string = 'desc';
    LoadTechName() {
      this.LogsServ.getLogs(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
        this.logsList.push(...response?.data);
        this.logsList.length = response?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.logsList);
        this.dataSource.paginator = this.paginator as MatPaginator;

      })
  }

  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader.busy();
    this.LogsServ.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.logsList = response?.data;
      this.logsList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.logsList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(()=> this.loader.idle(),2000) ;
  }



  ngOnInit(): void {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    // else{
    //   if(this.LogsServ.LogId !=0 && this.LogsServ.LogId !=null){


    //         if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    //         {
    //           this.router.navigateByUrl('/login');
    //         }
    //         else{
    //                 this.LogsServ.GetLogsById().subscribe(res => {

    //                   this.logsList = res?.data;

    //                   this.dataSource = new MatTableDataSource<any>(this.logsList);
    //                   this.dataSource._updateChangeSubscription();
    //                   this.dataSource.paginator = this.paginator as MatPaginator;
    //                   this.loader.idle();
    //                   this.LogsServ.LogId=0;
    //                 }
    //                 )
    //           }


    //   }
    else{


    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    }
  //}
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  onSearchClear() {
    this.searchKey = '';
    this.getRequestdata(1, 10, this.searchKey, this.sortColumnDef, "desc");

  }

applyFilter(filterValue: Event) {
  if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
  this.dataSource.filter =(<HTMLInputElement>filterValue.target).value.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}

  isDisable=false;

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
    this.loader.busy();
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
      this.LogsServ.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
        if (res.status == true) {

          this.logsList.length = cursize;
          this.logsList.push(...res?.data);
          this.logsList.length = res?.pagination.totalCount;
          this.dataSource = new MatTableDataSource<any>(this.logsList);
          this.dataSource._updateChangeSubscription();
          this.dataSource.paginator = this.paginator as MatPaginator;
          this.loader.idle();
        }
        else  this.toastr.success(":: add successfully");
      }, err => {
        this.toastr.warning(":: failed");
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



  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }


  Details(row:any){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { data:row };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = false;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(LogsDetailsComponent, dialogGonfig).afterClosed().subscribe(() => {
     this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    });

  }

}
