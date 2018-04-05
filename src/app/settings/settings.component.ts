import { Component } from '@angular/core';
import { UimodelService } from '../uimodel.service';
import { BsModalRef } from 'ngx-bootstrap';
import { IUimodel, Uimodel } from '../uimodel';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './settings.component.html',
  providers: [UimodelService],
})

export class SettingsComponent {
    uimodelservice: UimodelService;
    public onClose: Subject<boolean>;
    public availCol: IUimodel[] = [];
    public disCol: IUimodel[] = [];
    public calAvg: boolean;

    constructor(private _bsModalRef: BsModalRef) {
    }

    public ngOnInit(): void {
        this.onClose = new Subject();
        const uimodelObj = this.uimodelservice.getUimodelObj();

        uimodelObj.forEach(item => {
                if (item.visible === true) {
                    this.disCol.push(Object.assign(new Uimodel, item)); } else {
                    this.availCol.push(Object.assign(new Uimodel, item)); }
            }
        );
    }

    // Function called on OK click
    public onConfirm(): void {
        const uimodelObj: IUimodel[] = [];
        this.availCol.forEach(item => uimodelObj.push(item));
        this.disCol.forEach(item => uimodelObj.push(item));

        this.uimodelservice.setUimodelObj(uimodelObj);
        this._bsModalRef.hide();
        this.onClose.next(true);
    }

    // Function called on cross or cancel button click
    public onCancel(): void {
        this.onClose.next(false);
        this._bsModalRef.hide();
    }

    // Function called on drag of column name from visible columns(Displayed) to not visible column(Available)
    addToAvailItems($event: any) {
        const dragData: Uimodel = $event.value;
        const index: number = this.availCol.indexOf(dragData);
        this.availCol[index].visible = false;
    }

    // Function called on drag of column name from not visible columns(Available) to visible column(Displayed)
    addToDisplayItems($event: any) {
        const dragData: Uimodel = $event.value;
        const index: number = this.disCol.indexOf(dragData);
        this.disCol[index].visible = true;
    }
}
