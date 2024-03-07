import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {NotificationServiceService} from "../demo/service/notification-service.service";
import {Dialog} from "primeng/dialog";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('notificationsDialog') notificationsDialog: Dialog;
    notificationCount: number = 0;
    showNotificationsFlag: boolean = false;


    constructor(public layoutService: LayoutService,public notificationService: NotificationServiceService) {

    }

    showNotifications() {
        this.showNotificationsFlag = true;


    }

    ngOnInit(): void {
        this.notificationService.notificationCount$.subscribe(count => {
            this.notificationCount = count;
        });
    }

    hideNotifications() {
        this.showNotificationsFlag = false;
        this.notificationsDialog.close(null);

    }
}
