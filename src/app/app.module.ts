import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/Module/layout/layout.module';
import { MaterialModule } from './shared/Module/material/material.module';
import { LoginModule } from './shared/Module/login/login.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';
import { ChartsModule } from 'ng2-charts';







@NgModule({
  declarations: [
    AppComponent,
  
   // CategoryComponent,
    //ReceviedTypeComponent,
    //CompanyNameComponent,
   // LocationComponent,
   // AcceptanceComponent,
   






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ChartsModule,
    LayoutModule,
    MaterialModule,
    LoginModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    Title, { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
