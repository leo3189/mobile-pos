export class MenuCategoryName {
    id: number;
    menuCategoryID: number;
    languageID: number;
    localName: string;
    onlineName: string;
    shortName: string;

    constructor(
        menuCategoryID: number = 0,
        languageID: number = 0,
        localName: string = '',
        onlineName: string = '',
        shortName: string = '') {
            this.menuCategoryID = menuCategoryID;
            this.languageID = languageID;
            this.localName = localName;
            this.onlineName = onlineName;
            this.shortName = shortName;
    }
}