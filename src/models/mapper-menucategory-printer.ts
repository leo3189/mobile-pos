import { MenuCategory } from "./menu-category";
import { Printer } from './printer';

export class MapperMenuCategory_Printer {
    menuCategoryID: number;
    printerID: number;

    // related objects
    menuCategory: MenuCategory;
    printer: Printer;
}