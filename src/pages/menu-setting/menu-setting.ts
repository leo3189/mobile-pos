import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuCategorySettingPage } from './menu-category-setting';
import { MenuItemSettingPage } from './menu-item-setting';

/**
 * Generated class for the MenuSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-setting',
  templateUrl: 'menu-setting.html',
})
export class MenuSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuSettingPage');
  }

  goToCategorySetting() {
    this.navCtrl.push(MenuCategorySettingPage);
  }

  goToItemSetting() {
    this.navCtrl.push(MenuItemSettingPage);
  }

}
