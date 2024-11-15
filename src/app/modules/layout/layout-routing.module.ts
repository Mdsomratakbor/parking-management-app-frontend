import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'internal',
    component: LayoutComponent,
    loadChildren: () => import('../internal-tools/internal-tools.module').then((m) => m.InternalToolsModule),
  },
   { path: '', redirectTo: 'internal', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
