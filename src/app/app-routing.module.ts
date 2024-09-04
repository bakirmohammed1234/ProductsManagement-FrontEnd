import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CutomersComponent as CustomersComponent } from './cutomers/cutomers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [

  {path: 'admin', component: AdminTemplateComponent, canActivate:[ AuthenticationGuard ],children:[
    {path: 'products', component: ProductComponent},
    {path: 'customers', component:  CustomersComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
