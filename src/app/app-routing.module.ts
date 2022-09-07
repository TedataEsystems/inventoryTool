import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { LoginComponent } from './shared/component/login/login.component';

const routes: Routes = [
  {
    path:'login',
  component:LoginComponent,
 },
  {
    path:'',
    component: LayoutComponent,


    children: [
      {
      path:'',
      component: DashboardComponent,

    },
  ]
  
},
{
  path:'**',
 pathMatch: 'full',
component:ErrorPageComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
