import { Component } from '@angular/core';
import { UiModelService } from '../app/uimodel.service';
import { BsModalRef } from 'ngx-bootstrap';
import { IUiModel, UiModel } from '../app/uimodel';
import { DndModule, DragDropData } from 'ngx-dnd';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: './settings.component.html' ,
    providers: [UiModelService],
  })

export class SettingsComponent  {
    uimodelservice:UiModelService;
    public onClose: Subject<boolean>;
    public availCol:IUiModel[] = [];
    public disCol:IUiModel[] = [];
    public calAvg:boolean;
    
    constructor(private _bsModalRef: BsModalRef) {
    }

    public ngOnInit(): void {
        this.onClose = new Subject();
        let uimodelObj = this.uimodelservice.getUiModelObj();
        //console.log(uimodelObj);
        uimodelObj.forEach(item=>
            {
                if(item.visible == true) 
                    this.disCol.push(Object.assign(new UiModel,item));
                else
                    this.availCol.push(Object.assign(new UiModel,item));
            }  
        );
        //console.log(this.disCol);
    }

    //Function called on OK click
    public onConfirm(): void {
        let uimodelObj:IUiModel[] = [];
        this.availCol.forEach(item=> uimodelObj.push(item));
        this.disCol.forEach(item=> uimodelObj.push(item));
        //console.log(uimodelObj);
        this.uimodelservice.setUiModelObj(uimodelObj);
        this._bsModalRef.hide();
        this.onClose.next(true);
    }

    //Function called on cross or cancel button click
    public onCancel(): void {
        this.onClose.next(false);
        this._bsModalRef.hide();
    }
    
    //Function called on drag of column name from visible columns(Displayed) to not visible column(Available)
    addToAvailItems($event: any) {
        let dragData:UiModel = $event.dragData;
        let index:number = this.disCol.indexOf(dragData);
        if (index !== -1) {
            this.disCol.splice(index, 1);
            dragData.visible = false;
            this.availCol.push(dragData);
        } 
    }

    //Function called on drag of column name from not visible columns(Available) to visible column(Displayed)
    addToDisplayItems($event: any) {
        let dragData:UiModel = $event.dragData;
        let index:number = this.availCol.indexOf(dragData);
        if (index !== -1) {
            this.availCol.splice(index, 1);
            dragData.visible = true;
            this.disCol.push(dragData);
        }
    }
}
