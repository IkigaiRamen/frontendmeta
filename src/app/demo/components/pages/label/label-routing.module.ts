import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LabelComponent} from "./label.component";
import {StatistiqueComponent} from "./statistique/statistique.component";
import { LabelDeatilsComponent } from "./label-deatils/label-deatils.component";


const routes: Routes = [
    { path: '', component: LabelComponent},
    {path:'statistique',component:StatistiqueComponent},
    {path:'detail/:id',component:LabelDeatilsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelRoutingModule { }
