import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public plt: Platform, public utils: UtilsService) { }
  
  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
  }

}
