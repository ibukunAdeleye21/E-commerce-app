import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OrderComponent } from './order/order.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes =[
  { path: 'home', component: HomeComponent, title: "Home - E-commerce" },
  { path: 'catalog', component: CatalogComponent, title: "Catalog - E-commerce" },
  { path: 'cart', component: CartComponent, title: "Cart - E-commerce" },
  { path: 'productdetails', component: ProductdetailsComponent, title: "Productdetails - E-commerce" },
  { path: 'sign-in', component: SignInComponent, title: "SignIn - E-Commerce" },
  { path: 'register', component: RegisterComponent, title: "Register - E-commerce" },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'ForgotPassword - E-commerce'},
  { path: 'reset-password', component: ResetPasswordComponent, title: "ResetPassword - E-commerce" },
  { path: 'order', component: OrderComponent, title: "Order - E-commerce"},
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent, title: "ChangePassword - E-commerce" },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
