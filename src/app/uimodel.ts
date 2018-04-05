export interface IUimodel {
    id: number;
    shortName: string;
    longName: string;
    source: string;
    dataType: string;
    visible: boolean;
    sum: number;
    count: number;
 }

export class Uimodel implements IUimodel {
    id: number;
    shortName: string;
    longName: string;
    source: string;
    dataType: string;
    visible: boolean;
    sum: number;
    count: number;
    constructor() {
        this.visible = true;
        this.sum = 0;
        this.count = 0;
    }
}
