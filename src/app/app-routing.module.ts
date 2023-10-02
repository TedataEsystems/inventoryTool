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
import { AuthGuardService } from './auth-guard.service';
import { TypeStatusComponent } from './component/setting/type-status/type-status.component';
import { CategoryComponent } from './component/setting/category/category.component';
import { ReceviedTypeComponent } from './component/setting/recevied-type/recevied-type.component';
import { CompanyNameComponent } from './component/setting/company-name/company-name.component';
import { LocationComponent } from './component/setting/location/location.component';
import { AcceptanceComponent } from './component/setting/acceptance/acceptance.component';
import { TeamComponent } from './component/setting/team/team.component';
import { InventoryCapacityComponent } from './component/setting/inventory-capacity/inventory-capacity.component';
import { InventoryQuantityComponent } from './component/inventory-quantity/inventory-quantity.component';

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
      canActivate:  [AuthGuardService]

    },
    {
      path:'history',
      component:HistoryListComponent,
    },
    {
      path:'inventory',
      component:InventoryComponent,
      canActivate: [AuthGuardService]
    },

    {
      path:'inventoryQnt',
      component:InventoryQuantityComponent,
      canActivate: [AuthGuardService]
    },
    {path:'Type',
    component:TypeStatusComponent,
    canActivate: [AuthGuardService]

    },
    {
      path:'incoming',
      component:IncomingComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'outgoing',
      component:OutgoingComponent,
      canActivate: [AuthGuardService]
    },

    {path:'Category',
    component:CategoryComponent,
    canActivate: [AuthGuardService]

    },
    {
      path:'ReceviedType',
      component:ReceviedTypeComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'CompanyName',
      component:CompanyNameComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'InventoryCapacity',
      component:InventoryCapacityComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'Location',
      component:LocationComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'Acceptance',
      component:AcceptanceComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'Team',
      component:TeamComponent,
      canActivate: [AuthGuardService]
    },
    {
      path:'**',
     pathMatch: 'full',
    component:ErrorPageComponent,
    }
  ]

},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
