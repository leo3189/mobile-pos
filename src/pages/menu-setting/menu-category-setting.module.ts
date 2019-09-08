import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCategorySettingPage } from './menu-category-setting';

@NgModule({
  declarations: [
    MenuCategorySettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuCategorySettingPage),
  ],
})
export class MenuCategorySettingPageModule {}
