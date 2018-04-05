import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { ModalModule } from 'ngx-bootstrap';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule, NgxDatatableModule, HttpModule,
    ModalModule.forRoot(), NgxDnDModule, FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent, SettingsComponent]
})
export class AppModule { }
