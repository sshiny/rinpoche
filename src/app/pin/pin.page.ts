import { Component, ViewChild, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { APIService } from '../api.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  private code: Array<number>;
  private pageTitle: string;

  private checkPIN = async () => {
    try {
      const res = await this.api.login(sessionStorage.email, this.code.join('')).toPromise();
      if (res.ok) {
        sessionStorage.setItem("token", res.body['api_token']);
        return Promise.resolve();
      }
      return Promise.reject();
    } catch (e) {
      return Promise.reject();
    }
  };

  private handleEraseClick = (e: Event) => {
    this.code.pop();
    if (this.code.length === 0) {
      this.erase.disabled = true;
    }
  };

  private handleBtnClick = (id: number) => {
    if (this.code.length < 4) {
      this.code.push(id);
      if (this.code.length === 1) {
        this.erase.disabled = false;
      }
    }
  };

  private handleValidateClick = () => {
    this.checkPIN()
      .then(() => {
        sessionStorage.setItem("connected", "true");
        window.location.href = "home";
      })
      .catch(() => {
        this.showAlert("Le code PIN saisi est incorrect...");
      });
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
  erase: any;

  constructor(public alertController: AlertController, public api: APIService) {
    this.code = new Array();
    this.pageTitle = "Saisie du code";
  }

  ngOnInit() {
    this.disconnect();
  }

}
