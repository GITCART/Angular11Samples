import { NgModule } from '@angular/core';
import { PassengerDashboardComponent } from './containers/components/passenger-dashboard.component';
import { PassengerCountComponent } from './containers/components/passenger-count/passenger-count.component';
import { PassengerDashboardService } from './containers/services/passenger-dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { PassengerDetailComponent } from './containers/components/passenger-detail/passenger-detail.component';
import { CommonModule } from '@angular/common';
import { PassengerViewerComponent } from './containers/components/passenger-viewer/passenger-viewer.component';
import { FormsModule } from '@angular/forms';
import { PassengerFormComponent } from './containers/components/passenger-form/passenger-form.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [PassengerDashboardComponent, PassengerViewerComponent],
    declarations: [
        PassengerDashboardComponent,
        PassengerCountComponent,
        PassengerDetailComponent,
        PassengerViewerComponent,
        PassengerFormComponent
    ],
    providers: [
        PassengerDashboardService
    ],
})
export class PassengerDashboardModule { }
