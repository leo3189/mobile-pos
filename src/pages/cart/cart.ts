import { Component, Input, Renderer, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Content } from 'ionic-angular';
import { MenuItem } from '../../models/menu-item';
import { ItemSliding } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { OrderDetail } from '../../models/order-detail';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

 
  itemsInCart: any[];
  subTotal: number;
  tax: number;
  totalAmount: number;
  newHeaderHeight: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController
    ) {

      this.itemsInCart = this.navParams.get('itemsInCart');
      console.log("cart", this.itemsInCart);
      this.getTotalAmount();

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  private paymentActionSheet() {
    this.navCtrl.push(PaymentPage, {totalAmount: this.totalAmount});
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: 'Select your payment',
    //   buttons: [{
    //     text: 'Cash',
    //     handler: () => {
    //       console.log("Cash clicked");
    //     }
    //   },
    // {
    //   text: 'Credit Card',
    //   handler: () => {
    //     console.log("Credit Card clicked");
    //   }
    // },
    // {
    //   text: 'Cancel',
    //   role: 'cancel',
    //   handler: () => {
    //     console.log("Cancel clicked");
    //   }
    // }]
    // });
    // actionSheet.present();
  }

  private getTotalAmount() {
    this.subTotal = 0;

    this.itemsInCart.forEach((item) => {
      this.subTotal = this.subTotal + item.price * item.quantity;
    })

    this.tax = this.subTotal * 0.08875;
    this.totalAmount = this.subTotal + this.tax;
  }

  private removeFromCart(item, slidingItem: ItemSliding) {
    let index = this.itemsInCart.findIndex((index) => item.id == index.id)
    if(index != -1) {
      this.itemsInCart.splice(index, 1);
    }
    slidingItem.close();
    this.getTotalAmount();
  }

  // private getQuantity(menuItem) {

  //   let itemQuantity = [];
  //   itemQuantity = this.itemsInCart.filter(item => {
  //     return item.menuItemID == menuItem.menuItemID;
  //   })
  //   return itemQuantity.length;
  // } 

  // private displayMenuItemName(menuItem) {
  //   let menuItemName;
  //   menuItemName = this.itemsInCart.filter(item => {
  //     return item.menuItemID == menuItem.menuItemID;
  //   })
  //   return menuItemName.menuItemName;
  //   console.log("menu item name", menuItemName);
  // }
}
