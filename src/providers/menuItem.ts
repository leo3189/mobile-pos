import { Injectable } from '@angular/core';
import { Api } from "./api";


@Injectable()
export class MenuItemProvider {

  private END_POINT = 'MenuItem';

  constructor(private api: Api) {
    
  }

  createMenuItem(item) {
    return this.api.post(this.END_POINT, item);
  }

  updateMenuItem(id, item) {
    return this.api.patch(this.END_POINT + '/' + id, item);
  }

  updateMenuItemsSorting(menuItems) {
    return this.api.put(this.END_POINT, menuItems);
  }

  deleteMenuItem(id) {
    return this.api.delete(this.END_POINT + '/' + id);
  }

}