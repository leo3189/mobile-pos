import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MenuCategoryProvider } from '../../providers/menuCategory';
import { MenuCategory } from '../../models/menu-category';
import { MenuItem } from '../../models/menu-item';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartPage } from '../cart/cart';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';
import { OrderDetail } from '../../models/order-detail';
import { MenuSettingPage } from '../menu-setting/menu-setting';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  animations: [
    trigger('cartBadge', [
      state('idle', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('adding', style({
        opacity: '0.3',
        transform: 'scale(1.3)'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        style({transform: 'translateX(200%)'}),
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('addButton', [
      state('idle', style({
        opacity: '1',
        // transform: 'scale(1)'
      })),
      state('adding', style({
        opacity: '1',
        // transform: 'scale(1.3)'
        // fontWeight: 'bold'
      })),
      transition('idle <=> adding', animate('300ms linear')),
      transition('void => *', [
        // style({transform: 'translateY(200%)'}),
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class MenuPage {

  categories: MenuCategory[] = [];
  menuItem = [];
  menuItems = [];
  menuCategories = [];
  selectionCategories = 'Desserts';
  segmentsPerRow = 4;
  rows: Array<{}>;
  itemsInCart: any[] = [];
  items: Object[] = [];
  cartBadgeState: string = 'idle';
  itemQuantity: number;
  selectedItem: any;
  itemFound:boolean = false;
  selectedCategory: MenuCategory;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private menuCategoryProvider: MenuCategoryProvider,
    private changeDetector: ChangeDetectorRef,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    ) {

      const menuCategories = JSON.parse(localStorage.getItem("storageMenuItems"));
      this.categories = menuCategories["data"];
      // console.log("Menu categories", this.categories);

      this.viewMenuCategories(this.categories);    
      this.viewMenuItems(this.categories[1]);
      this.selectedCategory = this.categories[0];

      this.rows = Array.from(Array(Math.ceil(this.categories.length / this.segmentsPerRow)).keys());

      this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  isSelected(cat) {
    return cat.id == this.selectedCategory.id;
  }

  private viewMenuCategories(categories) {
    let menuCategories: any[] = [];
    categories.forEach(element => {
      if(element.id != 0) {
        let menuCategory = {
          id: element.id,
          name: element.nameList[0].localName
        }
        menuCategories.push(menuCategory);
      }
      this.menuCategories = menuCategories;
      console.log("Menu Categories: ", this.menuCategories);
    });
  }

  private viewMenuItems(category) {
    this.selectedCategory = category;
    let menuItems: any[] = [];
    this.categories.forEach(element => {
      if(category.id == element.id)  {
        for(var i = 0; i < element.menuItems.length; i++) {
          let menuItem = {
            id: element.menuItems[i].id,
            name: element.menuItems[i].nameList[0].localName,
            price: element.menuItems[i].defaultPrice,
            quantity: 0
          }
          menuItems.push(menuItem);
        }
        this.menuItems = menuItems;
        console.log("Menu items: ", this.menuItems);
      }
    });
  }

  private addToCart(menuItem) {
    let itemInCart = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: menuItem.quantity += 1,
    }
    
    let index = this.itemsInCart.findIndex((index) => menuItem.id == index.id)
    if(index != -1) {
      this.itemsInCart.splice(index, 1);
    }

    this.itemsInCart.push(menuItem);
    console.log("Items in cart", this.itemsInCart);

    menuItem.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();
  }

  private addToCartFinished(menuItem) {

    this.cartBadgeState = 'idle';
    menuItem.addButtonState = 'idle';
  }

  private viewCart() {   
    this.navCtrl.push(CartPage, {itemsInCart: this.itemsInCart});
  }

  private getQuantity(menuItem) {
    let qty: number;
    let itemQuantity: any;
    itemQuantity = this.itemsInCart.filter((item) => {
      if(item.id== menuItem.id) {
        qty = item.quantity;
      }
    })
    return qty;
  } 

  private getTotalCartQty() {
    let qty: number = 0;
    this.itemsInCart.forEach((item) => {    
      qty = qty + item.quantity;
    })
    return qty;  
  }

  private scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.presentToast(barcodeData.text);
    }).catch((err) => {
      this.presentToast(err);
    });
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  // private getItems(ev: any) {

  //   let items: any = this.menuItems.nameList[0].localName;
  //   let val = ev.target.value;

  //   console.log("get items", items);

  //   if(val && val.trim() != '') {
  //     items = items.filter((item) => {
  //       return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }

  goToMenuSetting() {
    this.navCtrl.push(MenuSettingPage);
  }

}

