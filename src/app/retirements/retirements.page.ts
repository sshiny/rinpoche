import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-retirements',
  templateUrl: './retirements.page.html',
  styleUrls: ['./retirements.page.scss'],
})
export class RetirementsPage implements OnInit {

  private retirements: Array<Object>;

  constructor(public plt: Platform, public utils: UtilsService, public api: APIService) {
    this.retirements = new Array();
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    this.api.retreats(sessionStorage.token).subscribe((data) => {
      if (Array.isArray(data.body)) {
        data.body.forEach((val) => {
          this.retirements.push(val);
        })
      }
    });
  }

  private searchHandler = (value: string) => {
    this.api.search(sessionStorage.token, "retirements", {search: value}).subscribe((data) => {
      if (Array.isArray(data.body)) {
        this.retirements = data.body;
      }
    });
  }

}
