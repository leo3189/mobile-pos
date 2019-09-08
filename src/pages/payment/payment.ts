import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentProcessedPage } from './payment-processed';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html', 
})
export class PaymentPage {

  totalAmount: Number;;
  cashReceived: Number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      let amount = this.navParams.get('totalAmount');
      this.totalAmount = amount.toFixed(2);
      
      console.log("total amount", this.totalAmount);
      console.log("cash received", this.cashReceived);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  private processPayment(type: String) {
    this.navCtrl.push(PaymentProcessedPage, {cashReceived: this.cashReceived, totalAmount: this.totalAmount, paymentType: type});
  }

}
