import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItemSettingPage } from './menu-item-setting';

@NgModule({
  declarations: [
    MenuItemSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuItemSettingPage),
  ],
})
export class MenuItemSettingPageModule {}
