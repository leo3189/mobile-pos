import { MenuItem } from "./menu-item";
import { Printer } from "./printer";

export class MapperMenuItem_Printer {
    menuItemID: number;
    printerID: number;

    // related objects
    menuItem: MenuItem;
    printer: Printer;
}