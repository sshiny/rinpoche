import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { APIService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public plt: Platform, public api: APIService) {
    this.plt.ready().then(() => {
      let isConnected = sessionStorage.connected;
      if (!isConnected || !JSON.parse(isConnected)) {
        window.location.href = "pin";
      }
    });
  }

  ngOnInit() {
    this.api.call().subscribe(console.log);
  }
}
