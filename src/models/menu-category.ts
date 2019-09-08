import { MenuCategoryName } from './menu-category-name';
import { SalesCategory } from './sales-category';
import { MenuItem } from './menu-item';
import { MapperMenuCategory_Printer } from './mapper-menucategory-printer';

export class MenuCategory {
    id: number;
    salesCategoryID: number;
    defaultPrinter: number;
    defaultTaxes: string;
    imageUrl: string;
    colorCode: string;
    menuItemSorting: number;
    isUsingSchedule: boolean;
    scheduleList: string;
    onlineVisible: boolean;
    localVisible: boolean;
    active: boolean;
    isNoPrinter: boolean;
    companyID: string;
    // related objects
    menuItems: MenuItem[];
    nameList: MenuCategoryName[];
    salesCategory: SalesCategory;
    printers: MapperMenuCategory_Printer[];

    constructor(
        salesCategoryID: number = 0,
        defaultPrinter: number = 0,
        defaultTaxes: string = '',
        imageUrl: string = '',
        colorCode: string = '',
        menuItemSorting: number = 0,
        isUsingSchedule: boolean = false,
        scheduleList: string = '',
        onlineVisible: boolean = true,
        localVisible: boolean = true,
        active: boolean = true,
        isNoPrinter: boolean = false,
        companyID: string = '',
        menuItems: MenuItem[] = [],
        nameList: MenuCategoryName[] = [],
        salesCategory: SalesCategory = new SalesCategory(),
        printers: MapperMenuCategory_Printer[] = []) {
            this.salesCategoryID = salesCategoryID;
            this.defaultPrinter = defaultPrinter;
            this.defaultTaxes = defaultTaxes;
            this.imageUrl = imageUrl;
            this.colorCode = colorCode;
            this.menuItemSorting = menuItemSorting;
            this.isUsingSchedule = isUsingSchedule;
            this.scheduleList = scheduleList;
            this.onlineVisible = onlineVisible;
            this.localVisible = localVisible;
            this.active = active;
            this.isNoPrinter = isNoPrinter;
            this.menuItems = menuItems;
            this.nameList = nameList;
            this.salesCategory = salesCategory;
            this.printers = printers;
            this.companyID = companyID;
    }
}