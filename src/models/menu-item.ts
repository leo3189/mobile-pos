import { MenuCategoryName } from './menu-category-name';
import { SalesCategory } from './sales-category';
import { MenuItemName } from './menu-item-name';

export class MenuItem {
    id: any;
    notes: string;
    description: string;
    onlineVisible: boolean;
    localVisible: boolean;
    isOpenItem: boolean;
    orderIndex: number;
    menuCategoryID: number;
    salesCategoryID: number;
    colorCode: string;
    imageUrl: string;
    defaultPrice: number;
    itemQuantity: number;

    nameList: MenuItemName[] = [];
    // menuCategory: MenuCategory = new MenuCategory();
    salesCategory: SalesCategory = new SalesCategory();

    constructor(notes: string = '', 
                description: string = '', 
                onlineVisible: boolean = false, 
                localVisible: boolean = true,
                isOpenItem: boolean = false, 
                orderIndex: number = 0, 
                menuCategoryID: number = 0, 
                salesCategoryID: number = 0,
                colorCode: string = '', 
                imageUrl: string = '', 
                defaultPrice: number = 0,
                itemQuantity: number = 0,
                nameList: MenuItemName[] = [],
                // menuCategory: MenuCategory = new MenuCategory(),
                salesCategory: SalesCategory = new SalesCategory()) {
                    this.notes = notes;
                    this.description = description;
                    this.onlineVisible = onlineVisible;
                    this.localVisible = localVisible;
                    this.isOpenItem = isOpenItem;
                    this.orderIndex = orderIndex;
                    this.menuCategoryID = menuCategoryID;
                    this.salesCategoryID = salesCategoryID;
                    this.colorCode = colorCode;
                    this.imageUrl = imageUrl;
                    this.defaultPrice = defaultPrice;
                    this.nameList = nameList;
                    // this.menuCategory = menuCategory;
                    this.salesCategory = salesCategory;
    }
}