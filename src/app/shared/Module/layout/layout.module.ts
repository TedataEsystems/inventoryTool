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
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
 
    
  ]
})
export class LayoutModule { }
