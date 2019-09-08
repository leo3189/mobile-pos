import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuSettingPage } from './menu-setting';

@NgModule({
  declarations: [
    MenuSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuSettingPage),
  ],
})
export class MenuSettingPageModule {}
