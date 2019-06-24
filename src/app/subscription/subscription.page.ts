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
    if (sessionStorage.retreat && sessionStorage.identity && sessionStorage.subscription) {
      if (sessionStorage.retreat == ret && sessionStorage.identity == id) {
        this.sub = JSON.parse(sessionStorage.subscription);
        return;
      }
    }
    this.api.subscription(sessionStorage.token, ret, id).subscribe((data) => {
      this.sub = data.body;
      sessionStorage.setItem("retreat", ret);
      sessionStorage.setItem("identity", id);
      sessionStorage.setItem("subscription", JSON.stringify(data.body));
    });
  }

}
