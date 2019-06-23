import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  private sub: Object;

  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) { }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    let ret = this.activatedRoute.snapshot.paramMap.get('ret');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.subscription(sessionStorage.token, ret, id).subscribe((data) => {
      console.log(data.body);
      this.sub = data.body;
    });
  }

}
