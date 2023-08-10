import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationName } from 'src/app/Model/location';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { LocationService } from 'src/app/shared/service/location.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  isShowDiv = false;
  isNameRepeated: boolean = false;
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
  });
  Location = {
    Id: 0,
    Name: "",
    CreatedBy: ""
  }

  locationList: LocationName[] = [];
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
  dataSource = new MatTableDataSource(this.locationList);
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;


  constructor(private titleService: Title
    , private notser: NotificationService, private router: Router, private loader: LoaderService,private route: ActivatedRoute, private LocationServ: LocationService, private dailogService: DeleteService
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
    this.LocationServ.GetLocation(this.pageNumber, this.pageSize, '', this.colname, this.coldir).subscribe(response => {
      this.locationList.push(...response?.data);
      this.locationList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.locationList);
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
    this.LocationServ.GetLocation(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.locationList = response?.data;
      this.locationList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.locationList);
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
    this.Location.Name = this.form.value.Name;
    this.Location.Id = this.form.value.Id;
    this.Location.CreatedBy =  localStorage.getItem('userName') || '';
    if (this.form.invalid || this.form.value.name == ' ') {
      if (this.form.value.name == ' ')
        this.setReactValue(Number(0), "");
      this.isDisable = false;
      return;
    }

    else {

      if (this.form.value.Id == 0 || this.form.value.Id == '' ) {
        this.isDisable = true;
        this.LocationServ.AddLocation(this.Location).subscribe(res => {
          setTimeout(() => {
            this.loader.idle();
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
              this.loader.idle();
            }, 0)
            this.notser.warn(":: failed");
          }
        );
      }//if
      else {
        //not used
        this.LocationServ.UpdateLocation(this.Location).subscribe(res => {
          setTimeout(() => {
            this.loader.idle();
          }, 1500)
          this.notser.success(":: update successfully");
          this.LoadCompanyName();
          this.form['controls']['Name'].setValue('');
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
    this.LocationServ.UpdateLocation(LocationEdit).subscribe(res => {
      if (res.status == true) {
        setTimeout(() => {
          this.loader.idle();
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
    this.LocationServ.GetLocation(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {

        this.locationList.length = cursize;
        this.locationList.push(...res?.data);
        this.locationList.length = res?.pagination.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.locationList);
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
    this.Location.Name = this.form.value.Name;
    this.Location.Id = this.form.value.Id;
    this.LocationServ.LocationIsAlreadySigned(this.Location.Name, this.Location.Id).subscribe(
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
    let LocationName = row.name;
    let LocationId = row.id;
    this.LocationServ.LocationIsAlreadySigned(LocationName, LocationId).subscribe(
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
        this.LocationServ.DeleteLocation(r.id).subscribe(
          rs => {
            if(rs.status==true){
              this.notser.success(':: successfully Deleted');
              this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
              //  this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
            }
            else{
              this.notser.warn(rs.data);
              this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
            }
         
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
