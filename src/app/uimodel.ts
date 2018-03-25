export interface IUiModel {
    id: number;
    shortName: string;
    longName : string;
    source : string;
    dataType : string;
    visible: boolean;
    sum:number;
    count:number;
 }

 export class UiModel implements IUiModel {
    id: number;
    shortName: string;
    longName : string;
    source : string;
    dataType : string;
    visible: boolean;
    sum:number;
    count:number;
    constructor()
    {
        this.visible = true;
        this.sum = 0;
        this.count = 0;
    }
 }