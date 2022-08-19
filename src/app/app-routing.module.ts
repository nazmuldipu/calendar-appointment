import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './container/month/month.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'month' },
  { path: 'month', component: MonthComponent },
  { path: 'month/:id', component: MonthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
