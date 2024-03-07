import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {



    model: any[] = [];

    constructor(public layoutService: LayoutService) {



    }

    ngOnInit() {

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },


            {
                label: 'UI Components',
                items: [
                    {
                        label: 'Gestion du Conformite',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/label'],

                    },



                    {
                        label: 'Gestion table/Object',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/notfound']
                    },
                    {
                        label: 'Gestion des Fields',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'Gestion de transformation',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
           
                
        

        ];

    }

}
