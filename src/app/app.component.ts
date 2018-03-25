import { Component } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgFor } from '@angular/common';

//Ngx datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//For Modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

//For calling second api every 1 min
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { IUiModel } from './uimodel';
import { UiModelService } from './uimodel.service';
import { PageDataService } from './pageData.service';

//Setting modal component
import { SettingsComponent } from '../settings/settings.component'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html' ,
  providers: [UiModelService, PageDataService],
  styles:['::ng-deep .above-avg { background : rgb(62, 17, 224)};'],
})
export class AppComponent  {
  
  public modalRef: BsModalRef;

  rows:any = [];
  columns:any = []; 
  calcAvg:boolean = false;

  constructor(
    private _uimodel: UiModelService, 
    private _pageData: PageDataService,
    private modalService: BsModalService
    ) {}

  //Initialize datatable header and populate data in table
  ngOnInit() : void {
    //getting column header data
    this._uimodel.getuimodel().subscribe(data => { 
    this.columns = this._uimodel.getUiModelObj();    
    
    //getting row data
    this.getPageData();
    });
    
    //Seeting timer for getting rows data every minute
    IntervalObservable.create(60000).subscribe(
      ()=> { this.getPageData(); }
    );
  }
  
  //To open settings modal
  openSettingsModal() {
    const initialState = { uimodelservice : this._uimodel, calAvg : this.calcAvg };
    this.modalRef = this.modalService.show(SettingsComponent, {initialState});
    
    this.modalRef.content.onClose.subscribe((result:any) => {
      if(result == true)
      {
        //Getting new changes done in settings modal
        this.columns = this._uimodel.getUiModelObj();
        this.calcAvg = this.modalRef.content.calAvg;
        console.log(this.calcAvg);
      }
    });
  }

  //Getting row data from second API
  getPageData()
  {
    this._pageData.getpagedata().subscribe((data:Object[]) => 
    {
      data.forEach(item => 
        {
          this.rows.push(item);
          //calling calculate average function for each row data
          this._uimodel.calAvgWithRow(item);
        }); 
      this.rows = [...this.rows];     
    });
  }

  //Setting color of cell to blue if the value is above average
  getCellClass = (row:any, column:any, value:any) => {
    {
      let colAvg = this._uimodel.getAvgForColumnWithName(row.column.prop);
      return {'above-avg' : Number(row.value) >= Number(colAvg)};
    }
  }
}
