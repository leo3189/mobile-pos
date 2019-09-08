import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { PrinterProvider } from '../../providers/printer';
import { EmailProvider } from '../../providers/email';
import p from 'node-thermal-printer';
import { MenuCategoryProvider } from '../../providers/menuCategory';
import { MenuCategory } from '../../models/menu-category';


/**
 * Generated class for the PaymentProcessedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-processed',
  templateUrl: 'payment-processed.html',
})
export class PaymentProcessedPage {

  totalPaid: number;
  totalAmount: number;
  changeAmount: number;
  paymentType: String;
  emailAddress: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private printerProvider: PrinterProvider,
    private emailProvider: EmailProvider,
    ) {
      this.totalPaid = this.navParams.get("cashReceived");
      this.totalAmount = this.navParams.get("totalAmount");
      this.paymentType = this.navParams.get("paymentType");
      this.cashChange();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentProcessedPage');
  }

  private cashChange() { 
    return this.changeAmount = this.totalPaid - this.totalAmount;   
  }

  private newOrder() {
    this.navCtrl.setRoot(MenuPage);
  }

  private sendReceiptEmail() {
    let alert = this.alertCtrl.create({
      title: 'Input customer email',
      inputs: [{
        name: 'email',
        placeholder: 'Email address',
        type: 'email'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
        },
        {
        text: 'Send',
        handler: data => {
          this.receiptEmail(data.email);
        }
      }]
    });
    alert.present();    
  }

  receiptEmail(emailAddress) {
    let params = {
      type: 'email',
      to: emailAddress,
      message: 'Your total amount $ ' + this.totalAmount,
      from: 'XXX Store',
      subject: 'Order receipt from XXX Store',
    }
    this.emailProvider.sendEmailApi(params).subscribe(
      (res) => {
        console.log("Receipt email result", res);
        this.newOrder();
      },
      (err) => {
        console.log("Receipt email error", err);
      }
    );
  }


  private showMsg(msg) {
    let alert = this.alertCtrl.create({
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  print() {
    p.init({
      type: p.printerTypes.EPSON,
      interface: "tcp://192.168.1.211:9100"
    });
    p.alignCenter();
    p.println("Hello world");
    p.printImage('./assets/olaii-logo-black.png', function(done){
      p.cut();
      p.execute(function(err){
        if (err) {
          console.error("Print failed", err);
        } else {
         console.log("Print done");
        }
      });
    });
  }

}
