import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,HttpClientModule],

    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
