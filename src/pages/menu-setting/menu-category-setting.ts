import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuCategoryProvider } from '../../providers/menuCategory';
import { MenuCategory } from '../../models/menu-category';
import { MenuCategoryName } from '../../models/menu-category-name';
import { SalesCategory } from '../../models/sales-category';

/**
 * Generated class for the MenuCategorySettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-category-setting',
  templateUrl: 'menu-category-setting.html',
})
export class MenuCategorySettingPage {

  cat: MenuCategory;
  salesCategory: SalesCategory;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private menuCategoryProvider: MenuCategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCategorySettingPage');
  }

  createCategory() {
    this.cat = new MenuCategory();
    this.cat.companyID = JSON.parse(localStorage.getItem('companyID'));
    var name0 = new MenuCategoryName();
    name0.languageID = 1;
    name0.localName = 'Drink'
    this.cat.nameList.push(name0);
    this.salesCategory = new SalesCategory();
    this.salesCategory.companyID = JSON.parse(localStorage.getItem('companyID'));
    
    console.log("Cat" , this.cat);

    let category = {
      companyID: JSON.parse(localStorage.getItem('companyID')),
      nameList: {localName: 'Drink'}
    }
    console.log("Cat", category);
    this.menuCategoryProvider.createMenuCategory(category).subscribe(
      (res) => {
        console.log("Create Category", res);
      },
      (err) => {
        console.log("Error Create Category", err);
      }
    );
  }

}
