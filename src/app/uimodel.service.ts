import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { IUiModel, UiModel } from './uimodel';

//Service to fetch column header data
@Injectable()
export class UiModelService {
    private _uimodelUrl='app/uimodel.json';
    private IUiModelObj : IUiModel[] = [];
    constructor(private _http: Http){}
   
    //Function to fetch column header data
    getuimodel(): Observable<IUiModel[]> {
    let jsonObject = this._http.get(this._uimodelUrl)
    .map((response: Response) => response.json())
    .do(data => 
      {
          console.log(data);
          this.createIUiModelArrayFromJson(data);
      });
     
     return jsonObject;
    }

    //Function to store header data in IUiModel structure 
    createIUiModelArrayFromJson(jsonObject:Observable<IUiModel[]>)
    {
        jsonObject.forEach(item => this.IUiModelObj.push(Object.assign(new UiModel(),item)));
        console.log(this.IUiModelObj);
    }

    getUiModelObj(): IUiModel[]
    {
        return this.IUiModelObj;
    }

    
    setUiModelObj(uimodelobj:IUiModel[])
    {
        this.IUiModelObj.splice(0,this.IUiModelObj.length);
        uimodelobj.forEach(item => this.IUiModelObj.push(item));
    }

    //Getting average value for column by shortName
    getAvgForColumnWithName(name:string):number
    {
            let obj = this.IUiModelObj.find(value => value.shortName == name);
            return (obj.sum/obj.count);
    }

    //Function to parse row data and calculate average for columns with datatype as number
    calAvgWithRow(data:Object)
    {
        let pageDataStrings = JSON.stringify(data).split('{')[1].split('}')[0].split(',');
        
        pageDataStrings.forEach( item => {
            let dataset = item.split(':');
            
            let obj = this.IUiModelObj.find(value => value.shortName == dataset[0].split('\"')[1]);
                if(obj != null && obj.dataType == "number")
                {
                    let val:number = Number(dataset[1]);
                    if(val != Number.NaN)
                        obj.sum = obj.sum + Number(dataset[1].split('\"')[1]);
                    obj.count = obj.count + 1;
                }
        });
    }
}