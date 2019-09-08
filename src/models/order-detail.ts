export class OrderDetail {
    id: number;
    orderID: number;
    menuItemID: number;
    menuItemName: string;
    tableID: number;
    seatNumber: number;
    addedBy: number;
    canceledBy: number;
    modifiedBy: number;
    comment: string;
    sizeID: number;
    price: number;
    quantity: number;
    isOpenItem: boolean;
    subtotalAmount: number;
    totalAmount: number;
    jsonTaxItemList: number;
    isPrinted: boolean;
    printedTime: number;
    childItemList: number;
    taxAmount: number;

    constructor(quantity: number = 0) {
        this.quantity = quantity;
    }
    

}