import { Component, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage {

  private static readonly PIN = new Array<number>(0, 0, 0, 0);
  private code : Array<number>;
  private pageTitle : string;

  private checkPIN = () => {
    for (let i = 0; i < PinPage.PIN.length; i++) {
      if (this.code[i] !== PinPage.PIN[i]) {
        return false;
      }
    }
    return true;
  };

  private handleEraseClick = (e : Event) => {
    this.code.pop();
    if (this.code.length === 0) {
      this.erase.disabled = true;
    }
  };

  private handleBtnClick = (id : number) => {
    if (this.code.length < 4) {
      this.code.push(id);
      if (this.code.length === 1) {
        this.erase.disabled = false;
      }
    }
  };

  private handleValidateClick = () => {
    if (this.code.length === 4) {
      console.log(this.code);
      console.log(PinPage.PIN);
      if (this.checkPIN()) {
        console.log("valid");
        if (window.sessionStorage) {
          sessionStorage.setItem("connected", "true");
          window.location.href = "home";
        }
      } else {
        console.log("invalid");
        this.showAlert();
      }
    }
  };

  private async showAlert() {
    const alert = await this.alertController.create({
      header: "",
      subHeader: "",
      message: "",
      buttons: ['OK']
    });

    await alert.present();
  }

  @ViewChild("erase")
  erase : any;

  constructor(public alertController: AlertController) {
    this.code = new Array();
    this.pageTitle = "Saisie du code";
  }

}
