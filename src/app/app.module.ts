import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { Title } from '@angular/platform-browser';
=======
>>>>>>> b2d7c5a625cbf001359252ddd7ff3d8773228f76
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './shared/Module/layout/layout.module';
import { MaterialModule } from './shared/Module/material/material.module';
import { LoginModule } from './shared/Module/login/login.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
<<<<<<< HEAD
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';
=======
import { ChartsModule } from 'ng2-charts';
>>>>>>> b2d7c5a625cbf001359252ddd7ff3d8773228f76





@NgModule({
  declarations: [
    AppComponent,
   






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
