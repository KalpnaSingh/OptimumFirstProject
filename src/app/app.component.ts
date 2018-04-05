import { Component } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { NgFor } from '@angular/common';

// Ngx datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// For Modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

// For calling second api every 1 min
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { IUimodel } from './uimodel';
import { UimodelService } from './uimodel.service';
import { PageDataService } from './page-data.service';

// Setting modal component
import { SettingsComponent } from './settings/settings.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UimodelService, PageDataService],
})
export class AppComponent {
  public modalRef: BsModalRef;

  rows: any = [];
  columns: any = [];
  calcAvg = false;
  private uimodelSub: Subscription;
  private pagaDataSub: Subscription;
  private intervalSub: Subscription;
  constructor(
    private _uimodel: UimodelService,
    private _pageData: PageDataService,
    private modalService: BsModalService
    ) {}

  // Initialize datatable header and populate data in table
  ngOnInit(): void {
    // getting column header data
    this.uimodelSub = this._uimodel.getuimodel().subscribe(data => {
    this.columns = this._uimodel.getUimodelObj();

    // getting row data
    this.getPageData();
    });

    // Seeting timer for getting rows data every minute
    this.intervalSub = IntervalObservable.create(60000).subscribe(
      () => { this.getPageData(); }
    );
  }

  ngOnDestroy(): void {
    this.uimodelSub.unsubscribe();
    this.pagaDataSub.unsubscribe();
    this.intervalSub.unsubscribe();
  }

  // To open settings modal
  openSettingsModal() {
    const initialState = { uimodelservice : this._uimodel, calAvg : this.calcAvg };
    this.modalRef = this.modalService.show(SettingsComponent, {initialState});

    this.modalRef.content.onClose.subscribe((result: any) => {
      if (result === true) {
        // Getting new changes done in settings modal
        this.columns = this._uimodel.getUimodelObj();
        this.calcAvg = this.modalRef.content.calAvg;
        console.log(this.calcAvg);
      }
    });
  }

  // Getting row data from second API
  getPageData() {
    this.pagaDataSub = this._pageData.getpagedata().subscribe((data: Object[]) => {
      data.forEach(item => {
          this.rows.push(item);
          // calling calculate average function for each row data
          this._uimodel.calAvgWithRow(item);
        });
      this.rows = [...this.rows];
    });
  }

  // Setting color of cell to blue if the value is above average
  getCellClass = (row: any, column: any, value: any) => {
    {
      const colAvg = this._uimodel.getAvgForColumnWithName(row.column.prop);
      return {'above-avg' : Number(row.value) >= Number(colAvg)};
    }
  }
}
