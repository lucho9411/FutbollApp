import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

const routes: Routes = [
  {
    path: '', component: TeamsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
