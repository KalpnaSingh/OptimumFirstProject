import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { SettingsComponent } from '../settings/settings.component';
import { ModalModule } from 'ngx-bootstrap';
import { DndModule } from 'ngx-dnd'

@NgModule({
  imports:      [ BrowserModule, NgxDatatableModule, HttpModule, 
    ModalModule.forRoot(), DndModule.forRoot() ],
  declarations: [ AppComponent, SettingsComponent ],
  bootstrap:    [ AppComponent, SettingsComponent ]
})
export class AppModule { }
