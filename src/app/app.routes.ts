import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/product/product.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product', component: AddProductComponent },
  { path: 'product/:id', component: AddProductComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
