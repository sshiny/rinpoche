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
  private id: string;
  
  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('ret');
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    this.api.retreat(sessionStorage.token, this.id).subscribe((data) => {
      this.ret = data.body;
    });
  }

}
