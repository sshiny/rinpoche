import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-retirements',
  templateUrl: './retirements.page.html',
  styleUrls: ['./retirements.page.scss'],
})
export class RetirementsPage implements OnInit {

  private retirements: Array<Object>;

  constructor(public plt: Platform, public utils: UtilsService) {
    this.retirements = new Array({name: "test", desc: "Coucou"});
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
  }

}
