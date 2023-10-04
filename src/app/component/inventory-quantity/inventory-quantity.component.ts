import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InventoryQnt } from 'src/app/Model/inventoryQnt';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { saveAs } from 'file-saver';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LocationName } from 'src/app/Model/location';
import { InventoryService } from 'src/app/shared/service/inventory.service';
import { TypeStatus } from 'src/app/Model/type-status';
import { InventoryQuantityService } from 'src/app/shared/service/inventory-quantity.service';
import { Inventory } from 'src/app/Model/inventory';
import { DeviceQuantity } from 'src/app/Model/DeviceQuantity';
@Component({
  selector: 'app-inventory-quantity',
  templateUrl: './inventory-quantity.component.html',
  styleUrls: ['./inventory-quantity.component.css'],
})
export class InventoryQuantityComponent implements OnInit, AfterViewInit {
  inventorySearch: InventoryQnt = <InventoryQnt>{};
  public LocationList: LocationName[] = [];
  public TypeStatusList: TypeStatus[] = [];
  deviceList: DeviceQuantity[]=[];
  searchKey: string = '';
  lastcol: string = 'Id';
  lastdir: string = 'desc';
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';
  @ViewChild('typeStatusSearch') typeStatusSearch!: ElementRef;
  pageIn = 0;
  previousSizedef = 100;
  pagesizedef: number = 100;
  public pIn: number = 0;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['DeviseName','DeviceCount','Location'];
  dataSource =new MatTableDataSource();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  public _TypeStatusList: any[] = [];
  constructor(
    private loader: LoaderService,
    private InventoryServ: InventoryService,
    private InventoryQuantityServ:InventoryQuantityService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  formSearch = this.fb.group({
    DeviceIds: [''],
    LocationId: [''],
  });
  ngOnInit(): void {
    this.InventoryServ.GettingLists().subscribe(res => {
      if (res.status == true) {
        this.LocationList = res.location;
     this.TypeStatusList = res.typeStatus;
     this._TypeStatusList = res.typeStatus;

      }
    })
  }
  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  ontypeNameInputChange() {

    const searchInput = this.typeStatusSearch.nativeElement.value ?
      this.typeStatusSearch.nativeElement.value.toLowerCase() : '';


    this.TypeStatusList = this._TypeStatusList.filter(u => {

      const name: string = u.name.toLowerCase();

      return name.indexOf(searchInput) > -1;

    }
    );



  }
  SaveFavoriteSearch() {
    this.loader.busy();
   // this.inventorySearch.DeviceType = this.formSearch.value.DeviceType;

   // this.inventorySearch.LocationIDs = this.formSearch.value.LocationId;

    // this.FavoriteSearchServ.AddEditFavoriteSearch(this.inventorySearch).subscribe(res => {

    //   this.toastr.success(':: Submitted successfully');

    //   this.loader.idle();
    // }

    // )
  }
  GetFavoriteSearch() {
    // this.FavoriteSearchServ.GetFavoriteSearch().subscribe(
    //   (res) => {
    //     if (res.status) {
    //       if (res.data.locationIDs != null) {
    //         this.formSearch.controls['LocationId'].setValue(
    //           res.data.locationIDs
    //         );
    //       }
    //     }
    //   },
    //   (err) => {
    //     this.toastr.warning('!fail');
    //   }
    // );
  }



  Search() {

   this.inventorySearch.StoreId = this.formSearch.value.LocationId;
this.inventorySearch.DevicesIds=this.formSearch.value.DeviceIds;
console.log(this.formSearch.value.LocationId,"location");
console.log(this.formSearch.value.DeviceIds,"Ids");
   this.InventoryQuantityServ.GetInventoryQuantity(this.inventorySearch,1, 100, '', this.sortColumnDef, this.SortDirDef).subscribe(res=>{
    console.log(res,"result");
  if(res.status==true){
  this.deviceList=res.data;
  console.log(this.deviceList,"deviselist")
  this.dataSource = new MatTableDataSource<any>(this.deviceList);
  console.log(this.dataSource,"Datasource");
  this.dataSource.paginator = this.paginator as MatPaginator;
     this.dataSource.sort = this.sort as MatSort;
     this.loader.idle();
  }

   });



    // this.InventoryServ.AdvancedSearch(this.inventorySearch).subscribe(res => {

    //   this.InventoryList = res as Inventory[];
    //   this.Ids2 = [];
    //   for (var iny of res) {
    //     this.Ids2.push(iny.id);
    //   }
    //   this.dataSource = new MatTableDataSource<any>(this.InventoryList);
    //   this.dataSource.paginator = this.paginator as MatPaginator;
    //   this.dataSource.sort = this.sort as MatSort;


    //   this.loader.idle();
    // }
    // )//subsribe
  }//advanced
  clearAdvancedSearch() {
    // this.Ids2 = [];

    this.formSearch.reset();
    // this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }

  applyFilter() {

      let searchData = this.searchKey.trim().toLowerCase();

     // this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");


  }


  onSearchClear() {
    this.searchKey = '';

    this.applyFilter();
  }
  sortData(sort: any) {



      if (this.lastcol == sort.active && this.lastdir == sort.direction) {
        if (this.lastdir == 'asc')
          sort.direction = 'desc';
        else
          sort.direction = 'asc';
      }
      this.lastcol = sort.active; this.lastdir = sort.direction;
      var c = this.pageIn;
      //this.getRequestdata(1, 100, '', sort.active, this.lastdir);

  }
  ExportExitPermitExcel(e: Event) {

    e.stopPropagation();

      let invSearch: InventoryQnt = <InventoryQnt>{};

      //invSearch.DeviceType = this.formSearch.value.DeviceType == "" ? null : this.formSearch.value.DeviceType;




      // if (this.Ids.length == 0) {

      //   invSearch.IDs == null;
      // } else {

      //   //console.log(this.Ids);
      //   invSearch.IDs = this.Ids;
      // }

     // invSearch.LocationIDs = this.formSearch.value.LocationId == "" ? null : this.formSearch.value.LocationId;


      // if (invSearch.LocationIDs == null &&invSearch.IDs == null &&  invSearch.DeviceType
      // ) {
      //   this.toastr.info('من فضلك اختار بعض العناصر ');
      // }
      // else {

      //   // this.InventoryServ.ExportExitPermitExcel(invSearch).subscribe(res => {

      //   //   const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
      //   //   const file = new File([blob], 'تصريح _الخروج' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

      //   //   saveAs(file, 'تصريح _الخروج' + Date.now() + '.xlsx');

      //   //   this.selectedRows = false;

      //   //   invSearch.IDs = [];
      //   //   /////////////////////

      //   //   this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      //   //   this.onSearchClear();
      //   //   this.Ids = [];
      //   //   this.Ids2 = [];
      //   // }, err => {

      //   //   this.toastr.warning("! Fail")

      //   // });
      // }
    }




}
