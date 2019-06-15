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
    this.retirements = new Array(
      {id: 1, name: "test", desc: "Coucou", firstDay: "06-06-2019", lastDay: "07-07-2019"},
      {id: 2, name: "test2", desc: "Coucou", firstDay: "06-06-2019", lastDay: "07-07-2019"},
      {id: 3, name: "test", desc: "Coucou", firstDay: "06-06-2019", lastDay: "07-07-2019"}
    );
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
  }

}
