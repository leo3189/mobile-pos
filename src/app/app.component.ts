import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuCategoryProvider } from '../providers/menuCategory';

import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { Menu } from 'ionic-angular/components/app/menu-interface';
import { MenuCategory } from '../models/menu-category';
import { LoginPage } from '../pages/login/login';
import { PaymentProcessedPage } from '../pages/payment/payment-processed';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  // categories: MenuCategory[] = [];
  pages: Array <{title: string, icon:string, component: any}>;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCategoryProvider: MenuCategoryProvider,
    private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Order', icon: 'clipboard', component: MenuPage},
    ];

    // this.getAllMenuItems();

    if(localStorage.getItem('userPassword')) {
      this.rootPage = MenuPage;  
    }else{
      this.rootPage = LoginPage;
    }

  }

  // private getAllMenuItems() {

  //   return this.menuCategoryProvider.getAllMenuCategoriesWithMenuItem().subscribe((data) => {
      
  //     this.categories = data;
  //     localStorage.setItem('storageMenuItems', JSON.stringify(data));

  //   })
  // }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  private logOut() {

    let prompt = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Are You Sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {} 
        },
        {
          text: 'OK',
          handler: data => {
            localStorage.removeItem('userPassword');
            localStorage.removeItem('storageMenuItems');
            localStorage.removeItem('companyID');
            this.nav.push(LoginPage);
          }
        }
      ]
    });
    prompt.present();

  }
}

