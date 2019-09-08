import { Component, Output } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController, Platform, AlertController } from 'ionic-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { LoginProvider } from '../../providers/login';
import { RegisterPage } from '../register/register';
import { MenuCategoryProvider } from '../../providers/menuCategory';
import { timeout } from 'rxjs/operator/timeout';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {

  loginForm: FormGroup;
  rootPage: any;
  loading: any;
  touchIdAvailable: boolean;
  accountList: CustomerAccount[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private lf: FormBuilder,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController, 
    private platform: Platform,
    private alertCtrl: AlertController,
    private loginProvider: LoginProvider,
    private menuCategoryProvider: MenuCategoryProvider
    ) {
    this.loginForm = this.lf.group({
      loginID: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    this.menuCtrl.enable(false);
  }

  ionViewWIllEnter() {
    
  }

  private logIn() {
    
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      
    });
    this.loading.present();
   
    this.loginProvider.login(this.loginForm.value).subscribe(
       (data) => {
       if(data.resultCode != 0) {
         this.getToast(data.message);
         this.loginForm.reset();
         this.loading.dismiss();
       }else {     
        localStorage.setItem('companyID', JSON.stringify(data.data[0].companyID));   
        this.menuCategoryProvider.getAllMenuCategoriesWithMenuItem().subscribe(
          (res) => {          
            localStorage.setItem('userPassword', JSON.stringify(this.loginForm.value));
            localStorage.setItem('storageMenuItems', JSON.stringify(res));
            this.navCtrl.setRoot(MenuPage);
            this.loading.dismiss(); 
          },
          (timeout) => {
            let prompt = this.alertCtrl.create({
              title: timeout.name,
              message: timeout.message,
              buttons: [{
                text: 'OK',
                role: 'cancel'
              }]
            });
            prompt.present();
            this.loading.dismiss();
            console.log("Time Out: ", timeout.message)
          }
        )}
      },
      (err) => {
        let prompt = this.alertCtrl.create({
          title: 'Unsuccesful login',
          message: 'Bad Internet, Try Agian ?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {}
            },
            {
              text: 'OK',
              handler: data => {
                this.logIn();
              }
            }
          ]
        });
        prompt.present();
        this.loading.dismiss();
      });
  }

  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ionViewDidLoad() {
    this.loginForm = this.lf.group({
      loginID: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    console.log('ionViewDidLoad LoginPage');
  
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }
}

export interface CustomerAccount {
  customerAccountID: string;
  companyID: string;
  company: any;
}

  
  
  


