import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RenderComponent } from './modules/render/render.component';
import { CreateComponent } from './modules/create/create.component';
import { MainComponent } from './components/main/main.component';
import { RoutingModule } from './/routing.module';
import { MaterialModule } from './material.module';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { DetailsPopupComponent } from './components/details-popup/details-popup.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RefineGridComponent } from './modules/refine-grid/refine-grid.component';
@NgModule({
  declarations: [
    AppComponent,
    RenderComponent,
    CreateComponent,
    MainComponent,
    ApplicationsListComponent,
    DetailsPopupComponent,
    RefineGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    HttpModule,
		HttpClientModule,
  ],
  providers: [],
  exports: [ DetailsPopupComponent ],
  entryComponents: [DetailsPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
