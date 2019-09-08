import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyProvider } from '../../providers/company';
import { CompanyRegister } from '../../models/company-register';
import { MenuPage } from '../menu/menu';
import { EmailProvider } from '../../providers/email';
import { MenuCategoryProvider } from '../../providers/menuCategory';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registrationGroup: FormGroup;
  companyRegister: CompanyRegister;
  vCode: any;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rG: FormBuilder,
    private companyProvider: CompanyProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private emailProvider: EmailProvider,
    private menuCategoryProvider: MenuCategoryProvider) {

      this.registrationGroup = this.rG.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        companyName: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        street1: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAccount() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();

    this.sendVerifyEmail(this.registrationGroup.value.email);   
  }

  showMsg(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  sendVerifyEmail(emailAddress) {
    let params = {
      type: 'email',
      to : emailAddress,
      verification_method: 'generate',
    }
    this.emailProvider.sendEmailApi(params).subscribe(
      (res) => {
        console.log("Result", res);
        if(res.status == "success") {
          this.inputVerificationCode();
        }else {
          this.showMsg(res.error);
          this.loading.dismiss();
        }       
    },
    (err) => {
      console.log("Error", err);
    });
  }

  inputVerificationCode() {
    let alert = this.alertCtrl.create({
      title: 'Input your Verification Code',
      subTitle: 'A verification code sent to ' + this.registrationGroup.value.email,
      inputs: [{
        name: 'code',
        placeholder: 'Verification Code',
        type: 'tel'
      }],
      buttons: [{
        text: 'Validate',
        handler: data => {
          this.verificationCode(this.registrationGroup.value.email, data.code);
        }
      }]
    });
    alert.present();
  }

  verificationCode(emailAddress, code) {
    let params = {
      type: 'email',
      to : emailAddress,
      verification_method: 'validate',
      verification_code: code
    }
    this.emailProvider.sendEmailApi(params).subscribe(
      (res) => {
        console.log("Result", res);
        if(res.status == "success") {
          this.createCompany();         
        }else {
          this.showMsg(res.error);
          this.loading.dismiss();
        }
      },
      (err) => {
        console.log("Error" ,err);
      }
    );
  }

  createCompany() {
    let c = {
      loginID: this.registrationGroup.value.email,
      password: this.registrationGroup.value.password,
      companyName: this.registrationGroup.value.companyName,
      phone: this.registrationGroup.value.phone,
      firstName: this.registrationGroup.value.firstName,
      lastName: this.registrationGroup.value.lastName,
      street1: this.registrationGroup.value.street1,
      city: this.registrationGroup.value.city,
      state: this.registrationGroup.value.state,
      zip: this.registrationGroup.value.zip,
      email: this.registrationGroup.value.email,
      country: "US",
      createdBy: 1
    }
    this.companyProvider.companyRegister(c).subscribe(
      (res) => {
        console.log("API response", res);  
        if(res.resultCode != 0) {
          this.showMsg(res.message);
          this.loading.dismiss();
        }else {
          this.registerSuccess(res.data);
        }
      },
      (err) => {
        console.log("API response", err);
        this.loading.dismiss();
      });
  }

  registerSuccess(data) {
    this.companyProvider.activeAccount(data).subscribe(
      (res) => {
        console.log("Account Active", res);
        if(res.resultCode != 0) {
          this.showMsg(res.message);
          this.loading.dismiss();
        }else {
          let userPwd = {
            loginID: this.registrationGroup.value.email,
            password: this.registrationGroup.value.password
          }
          localStorage.setItem('companyID', JSON.stringify(data));
          localStorage.setItem('userPassword', JSON.stringify(userPwd));
          this.menuCategoryProvider.getAllMenuCategoriesWithMenuItem().subscribe(
            (res) => {
              localStorage.setItem('storageMenuItems', JSON.stringify(res));
              this.showMsg("Thank you for registering");
              this.navCtrl.setRoot(MenuPage);
              this.loading.dismiss(); 
            }
          )
        }
      },
      (err) => {
        console.log("active Error", err);
        this.loading.dismiss();
      });   
  }
}

