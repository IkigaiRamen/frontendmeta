import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../../../service/label.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
    selector: 'app-label-deatils',
    standalone: true,
    imports: [TableModule, ButtonModule],
    templateUrl: './label-deatils.component.html',
    styleUrls: ['./label-deatils.component.scss'],
})
export class LabelDeatilsComponent implements OnInit {
    selectedLabel: any;
    isExpanded: any;
    expandedRows: any;
    labelDetailsText = 'Label Details';
    documentationText = 'Documentation';
    noDocumentsText = 'There are no documents for this label yet.';

    constructor(
        private labelService: LabelService,
        private _route: ActivatedRoute,
        private languageService: LanguageServiceService // Inject LanguageServiceService
    ) {}

    ngOnInit(): void {
        console.log(this._route.snapshot.params['id'] , "test");

        this.labelService
            .getLabelById(this._route.snapshot.params['id'])
            .subscribe(
                (res: any) => {
                    this.selectedLabel = res;
                    console.log(res);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    // Function to translate the column names
    translate(key: string): string {
        return this.languageService.getTranslation(key);
    }
}
