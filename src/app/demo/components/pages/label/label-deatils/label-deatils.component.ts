import {Component, OnInit} from '@angular/core';
import {LabelService} from "../../../../service/label.service";
import {ActivatedRoute} from "@angular/router";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-label-deatils',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule
    ],
  templateUrl: './label-deatils.component.html',
  styleUrl: './label-deatils.component.scss'
})
export class LabelDeatilsComponent implements OnInit{

    selectedLabel: any;
    isExpanded: any;
    expandedRows: any;
    constructor(private labelService :LabelService,private _route:ActivatedRoute) {
    }
    ngOnInit(): void {
        console.log(this._route.snapshot.params['id'])

        this.labelService.getLabelById(this._route.snapshot.params['id']).subscribe((res:any)=>{
            this.selectedLabel=res;
            console.log(res);

        },error => {
            console.log(error)
        })
    }

}
