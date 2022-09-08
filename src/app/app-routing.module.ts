import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HistoryListComponent } from './component/history-list/history-list.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { IncomingComponent } from './component/setting/incoming/incoming.component';
import { OutgoingComponent } from './component/setting/outgoing/outgoing.component';
import { StoreComponent } from './component/setting/store/store.component';
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
    {
      path:'history',
      component:HistoryListComponent,
    },
    {
      path:'inventory',
      component:InventoryComponent
    },
    {path:'store',
    component:StoreComponent

    },
    {
      path:'incoming',
      component:IncomingComponent
    },
    {
      path:'outgoing',
      component:OutgoingComponent
    }
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
