import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  redirectToPinPage(platform: Platform) {
    platform.ready().then(() => {
      let isConnected = sessionStorage.connected;
      if (!isConnected || !JSON.parse(isConnected)) {
        window.location.href = "pin";
      }
    });
  }

}
