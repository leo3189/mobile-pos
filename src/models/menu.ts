import { MenuName } from './menu-name';
import { MenuMap } from './menu-map';

export class Menu {
    id: number;
    orderIndex: number;
    colorCode: string;
    imageUrl: string;
    onlineVisible: boolean;
    localVisible: boolean;
    isUsingSchedult: boolean;
    active: boolean;

    nameList: MenuName[];
    mapList: MenuMap[];

    constructor(
        orderIndex: number = 0,
        colorCode: string = '',
        imageUrl: string = '',
        onlineVisible: boolean = false,
        localVisible: boolean = false,
        isUsingSchedult: boolean =false,
        active: boolean = true,
        nameList: MenuName[] = [],
        mapList: MenuMap[] = []) {
            this.orderIndex = orderIndex;
            this.colorCode = colorCode;
            this.imageUrl = imageUrl;
            this.onlineVisible = onlineVisible;
            this.localVisible = localVisible;
            this.isUsingSchedult = isUsingSchedult;
            this.active = active;
            this.nameList = nameList;
            this.mapList = mapList;
        }
}