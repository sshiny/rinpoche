import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public plt: Platform, public utils: UtilsService) {
    this.utils.redirectToPinPage(plt);
  }
  
}
