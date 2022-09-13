import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OrderStatusComponent} from "../order-status/order-status.component";
import {MenuComponent} from "../menu/menu.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },{
    path: 'order-status',
    component: OrderStatusComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
