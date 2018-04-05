import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

// Service to fetch row data
@Injectable()
export class PageDataService {
   private _pageDataUrl = 'assets/pageData.json';
   private pageString: Array<Object> = [];

   constructor(private _http: Http) {
   }

   // Function to fetch data for rows
   getpagedata(): Observable<Object> {
       return this._http.get(this._pageDataUrl)
      .map((response: Response) => response.json())
      .catch(this.handleError);
   }

   private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error());
  }
}
