import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public plt: Platform) {
    this.plt.ready().then(() => {
      let isConnected = sessionStorage.connected;
      if (!isConnected || !JSON.parse(isConnected)) {
        window.location.href = "pin";
      }
    });
  }
}
