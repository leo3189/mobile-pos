import { Injectable } from '@angular/core';
import { Api } from "./api";
import { Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MenuItemSettingPageModule } from '../pages/menu-setting/menu-item-setting.module';

@Injectable()
export class MenuCategoryProvider {

  private END_POINT = '/menu-categories';

  constructor(private api: Api) {
    
  }

  getAllMenuCategories() {
    return this.api.get(this.END_POINT);
  }

  getAllMenuCategoriesWithMenuItem() {
    return this.api.get(this.END_POINT + '/menu-items?branch_id=')
    .map((response: Response) => {
      let menuItems = response.json();
      // console.log("menuItems", menuItems);
      return menuItems;
    })
  
  }

  getMenuItemsByCategoryID(id: number) {
    return this.api.get(this.END_POINT + '/' + id + '/MenuItems')
    .map((response: Response) => {
      let menuItem = response.json();
      return menuItem;
    })
  }

  createMenuCategory(cat) {
    return this.api.post(this.END_POINT, cat)
    .map((response: Response) => {
      let MenuCategory = response.json();
      return MenuCategory;
    })
  }

  updateMenuCategory(id, cat) {
    return this.api.patch(this.END_POINT + '/' + id, cat);
  }

  deleteMenuCategory(id) {
    return this.api.delete(this.END_POINT + '/' + id);
  }

}