import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LabelRoutingModule } from './label-routing.module';
import { MessageService } from "primeng/api";
import { EditorModule } from 'primeng/editor';

import { LabelComponent } from './label.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LabelRoutingModule,
    EditorModule,
  ],
    providers : [
        MessageService
    ]
})
export class LabelModule { }
