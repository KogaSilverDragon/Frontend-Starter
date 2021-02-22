import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AdminProductComponent} from "./components/admin-product/admin-product.component";
import {AdminUserComponent} from "./components/admin-user/admin-user.component";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { hideHeader: true } },
  {
    path: 'admin',
    data: { hideCart: true },
    canActivateChild: [AdminGuard],
    children: [
      { path: '', component: AdminPanelComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'product/:id', component: AdminProductComponent },
      { path: 'user', component: AdminUserComponent },
      { path: 'user/:id', component: AdminUserComponent }
    ]
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
