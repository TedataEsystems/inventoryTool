import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { SidenavComponent } from '../../component/sidenav/sidenav.component';
import { LayoutComponent } from '../../component/layout/layout.component';
import { LoadingPageComponent } from '../../component/loading-page/loading-page.component';
import { ErrorPageComponent } from '../../component/error-page/error-page.component';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditComponent } from 'src/app/component/edit/edit.component';
import { HistoryListComponent } from 'src/app/component/history-list/history-list.component';
import { InventoryComponent } from 'src/app/component/inventory/inventory.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncomingComponent } from 'src/app/component/setting/incoming/incoming.component';
import { OutgoingComponent } from 'src/app/component/setting/outgoing/outgoing.component';
import { StoreComponent } from 'src/app/component/setting/store/store.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TypeStatusComponent } from 'src/app/component/setting/type-status/type-status.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from 'src/app/interceptors/loading.interceptor';
import { AddTypeComponent } from '../../../component/add-type/add-type.component';
import { CompanyNameComponent } from 'src/app/component/setting/company-name/company-name.component';
import { LocationComponent } from 'src/app/component/setting/location/location.component';
import { AcceptanceComponent } from 'src/app/component/setting/acceptance/acceptance.component';
import { ReceviedTypeComponent } from 'src/app/component/setting/recevied-type/recevied-type.component';
import { CategoryComponent } from 'src/app/component/setting/category/category.component';
import { AddComponent } from 'src/app/component/add/add.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';






@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SidenavComponent,
    LoadingPageComponent,
    ErrorPageComponent,
    DeleteMsgComponent,
    DashboardComponent,
    EditComponent,
    HistoryListComponent,
    InventoryComponent,
    StoreComponent,
    IncomingComponent,
    OutgoingComponent,
    TypeStatusComponent,
    CompanyNameComponent,
    LocationComponent,
    AcceptanceComponent,
    ReceviedTypeComponent,
    CategoryComponent,
    AddTypeComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
   NgxMatDatetimePickerModule,
 NgxMatMomentModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),


  ],
  providers:[{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}]
})
export class LayoutModule { }
