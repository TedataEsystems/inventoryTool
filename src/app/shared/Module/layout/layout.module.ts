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
<<<<<<< HEAD
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TypeStatusComponent } from 'src/app/component/setting/type-status/type-status.component';
=======
import { ChartsModule } from 'ng2-charts';

>>>>>>> b2d7c5a625cbf001359252ddd7ff3d8773228f76




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
    TypeStatusComponent
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
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),


  ]
})
export class LayoutModule { }
