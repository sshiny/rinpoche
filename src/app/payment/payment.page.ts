import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  private payments: Array<Object>;
  private types: Object;
  private states: Object;
  private new: Object;
  private ret: string;
  private id: string;

  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) {
    this.ret = this.activatedRoute.snapshot.paramMap.get('ret');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.payments = new Array();
    this.types = {
      check: 'Chèque',
      paypal: 'Paypal',
      cash: 'Espèces',
      transfer: 'Virement'
    };
    this.states = {
      waitingPayment: 'En attente',
      received: 'Reçu',
      cashed: 'Encaissé',
      canceled: 'Annulé'
    };
    this.new = {
      retreat_id: this.ret,
      identity_id: this.id,
      type: "",
      state: "",
      amount: "",
      comment: ""
    };
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    this.api.payments(sessionStorage.token, this.ret, this.id).subscribe((data) => {
      if (Array.isArray(data.body)) {
        this.payments = data.body;
        this.payments.forEach((val, idx) => {
          for (let type in this.types) {
            if (type === val['type']) {
              val['type'] = this.types[type];
              break;
            }
          }
          for (let state in this.states) {
            if (state === val['state']) {
              val['state'] = this.states[state];
              break;
            }
          }
        });
      }
    });
  }

  private checkForm = () => {
    let isValid = true;
    Object.keys(this.new).forEach((val, key) => {
      if (!this.new[val]) {
        isValid = false;
      }
    });
    return isValid;
  };

  private handleSaveClick = async () => {
    if (this.checkForm()) {
      let user = await this.api.getUserId(sessionStorage.token).toPromise();
      this.new['user_id'] = user.body['id'];
      this.api.newPayment(sessionStorage.token, this.new).subscribe((data) => {
        console.log(data.body);
      });
    }
  };

}
