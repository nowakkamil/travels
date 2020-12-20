import { AuthGuardService } from './services/auth-guard.service';
import { TravelsComponent } from './components/travels/travels.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuestGuardService } from './services/auth-guest-guard.service';

const routes: Routes = [
  { path: 'detail/:id', component: TripDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuardService] },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuestGuardService] },
  { path: '', component: TravelsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
