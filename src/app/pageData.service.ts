import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//Service to fetch row data
@Injectable()
export class PageDataService {
   private _pageDataUrl='app/pageData.json';
   private pageString: Array<Object> = [];
   
   constructor(private _http: Http){ 
   }
   
   //Function to fetch data for rows
   getpagedata(): Observable<Object> {
       return this._http.get(this._pageDataUrl)
      .map((response: Response) => response.json())
     // .do(data => console.log(JSON.stringify(data)));
   }
}