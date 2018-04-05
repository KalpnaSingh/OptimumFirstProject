import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IUimodel, Uimodel } from './uimodel';

// Service to fetch column header data
@Injectable()
export class UimodelService {
    private _uimodelUrl = 'assets/uimodel.json';
    private IUimodelObj: IUimodel[] = [];
    constructor(private _http: Http) {}

    // Function to fetch column header data
    getuimodel(): Observable<IUimodel[]> {
    const jsonObject = this._http.get(this._uimodelUrl)
    .map((response: Response) => response.json())
    .do(data => {
          console.log(data);
          this.createIUimodelArrayFromJson(data);
      }).catch(this.handleError);

     return jsonObject;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }

    // Function to store header data in IUimodel structure
    createIUimodelArrayFromJson(jsonObject: Observable<IUimodel[]>) {
        jsonObject.forEach(item => this.IUimodelObj.push(Object.assign(new Uimodel(), item)));
        console.log(this.IUimodelObj);
    }

    getUimodelObj(): IUimodel[] {
        return this.IUimodelObj;
    }

    setUimodelObj(uimodelobj: IUimodel[]) {
        this.IUimodelObj.splice(0, this.IUimodelObj.length);
        uimodelobj.forEach(item => this.IUimodelObj.push(item));
    }

    // Getting average value for column by shortName
    getAvgForColumnWithName(name: string): number {
            const obj = this.IUimodelObj.find(value => value.shortName === name);
            return (obj.sum / obj.count);
    }

    // Function to parse row data and calculate average for columns with datatype as number
    calAvgWithRow(data: Object) {
        const pageDataStrings = JSON.stringify(data).split('{')[1].split('}')[0].split(',');

        pageDataStrings.forEach( item => {
            const dataset = item.split(':');
            const obj = this.IUimodelObj.find(value => value.shortName === dataset[0].split('\"')[1]);
                if (obj != null && obj.dataType === 'number') {
                    const val: number = Number(dataset[1]);
                    if (val !== Number.NaN) {
                        obj.sum = obj.sum + Number(dataset[1].split('\"')[1]); }
                    obj.count = obj.count + 1;
                }
        });
    }
}
