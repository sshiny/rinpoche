import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-retirement',
  templateUrl: './retirement.page.html',
  styleUrls: ['./retirement.page.scss'],
})
export class RetirementPage implements OnInit {

  private ret: Object;
  
  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) { }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    let ret = this.activatedRoute.snapshot.paramMap.get('ret');
    this.api.retreat(sessionStorage.token, ret).subscribe((data) => {
      console.log(data.body);
      this.ret = data.body;
    });
  }

}
