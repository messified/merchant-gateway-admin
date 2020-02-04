import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './admin/shared/line-chart/line-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopNavBarComponent } from './layout/top-nav-bar/top-nav-bar.component';
import { BrandingComponent } from './layout/branding/branding.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { LineChartService } from './admin/shared/line-chart/line-chart.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LineChartComponent,
    TopNavBarComponent,
    BrandingComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    LineChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
