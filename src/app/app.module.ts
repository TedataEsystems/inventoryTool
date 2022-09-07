import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { SidenavComponent } from './shared/component/sidenav/sidenav.component';
import { LoginComponent } from './shared/component/login/login.component';
import { LoadingPageComponent } from './shared/component/loading-page/loading-page.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { DeleteMsgComponent } from './shared/component/delete-msg/delete-msg.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/Module/layout/layout.module';
import { MaterialModule } from './shared/Module/material/material.module';
import { LoginModule } from './shared/Module/login/login.module';




@NgModule({
  declarations: [
    AppComponent,
   
   
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
