import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExhibitsComponent } from './exhibits.component';

const routes: Routes = [
  { path: '', component: ExhibitsComponent },
  { path: 'successful', loadChildren: () => import('./successful/successful.module').then(m => m.SuccessfulModule) }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibitsRoutingModule { }
