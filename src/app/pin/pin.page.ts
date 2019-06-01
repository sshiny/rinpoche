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
      if (this.checkPIN()) {
        if (window.sessionStorage) {
          sessionStorage.setItem("connected", "true");
          window.location.href = "home";
        } else {
          this.showAlert("Une erreur est survenue...");
        }
        return;
      }
    }
    this.showAlert("Le code PIN saisi est incorrect...");
  };

  private disconnect = () => {
    if (window.sessionStorage && sessionStorage.connected) {
      sessionStorage.removeItem("connected");
    }
  };

  private showAlert = async (str: string) => {
    const alert = await this.alertController.create({
      header: "Erreur",
      message: str,
      cssClass: "ion-text-center",
      buttons: [
        {
          text: "Fermer",
          role: "cancel",
          cssClass: "ion-text-center",
          handler: () => {
            this.code = new Array();
            this.erase.disabled = true;
          }
        }
      ]
    });

    await alert.present();
  }

  @ViewChild("erase")
  erase : any;

  constructor(public alertController: AlertController) {
    this.disconnect();
    this.code = new Array();
    this.pageTitle = "Saisie du code";
  }

}
