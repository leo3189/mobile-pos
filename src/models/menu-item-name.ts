export class MenuItemName {
    id: number;
    menuItemID: number;
    languageID: number;
    localName: string;
    onlineName: string;
    shortName: string;

    constructor(
        menuItemID: number = 0,
        languageID: number = 0,
        localName: string = '',
        onlineName: string = '',
        shortName: string = '') {
            this.menuItemID = menuItemID;
            this.languageID = languageID;
            this.localName = localName;
            this.onlineName = onlineName;
            this.shortName = shortName;
    }
}