import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentProcessedPage } from './payment-processed';

@NgModule({
  declarations: [
    PaymentProcessedPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentProcessedPage),
  ],
})
export class PaymentProcessedPageModule {}
