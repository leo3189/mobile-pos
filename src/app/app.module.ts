import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ItemSliding } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { LoginPage } from '../pages/login/login';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentProcessedPage } from '../pages/payment/payment-processed';
import { MenuSettingPage } from '../pages/menu-setting/menu-setting';
import { MenuCategorySettingPage } from '../pages/menu-setting/menu-category-setting';
import { MenuItemSettingPage } from '../pages/menu-setting/menu-item-setting';
import { ExpandableHeader } from '../components/expandable-header/expandable-header';

import { Api } from '../providers/api';
import { MenuPage } from '../pages/menu/menu';
import { MenuCategoryProvider } from '../providers/menuCategory';
import { HttpModule } from '@angular/http';
import { LoginProvider } from '../providers/login';
import { RegisterPage } from '../pages/register/register';
import { CompanyProvider } from '../providers/company';
import { PrinterProvider } from '../providers/printer';
import { EmailProvider } from '../providers/email';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    CartPage,
    LoginPage,
    PaymentPage,
    PaymentProcessedPage,
    RegisterPage,
    MenuSettingPage,
    MenuCategorySettingPage,
    MenuItemSettingPage,
    ExpandableHeader
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    CartPage,
    LoginPage,
    PaymentProcessedPage,
    PaymentPage,
    MenuSettingPage,
    MenuCategorySettingPage,
    MenuItemSettingPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    MenuCategoryProvider,
    EmailProvider,
    LoginProvider,
    CompanyProvider,
    BarcodeScanner,
    ItemSliding,
    PrinterProvider,
    
  ]
})
export class AppModule {}
