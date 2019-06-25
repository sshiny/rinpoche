import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  private formData: Object;

  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) {
    this.formData = {
      first_name: "",
      last_name: "",
      birthday: "",
      gender: "",
      address: "",
      zipcode: "",
      city: "",
      country: "",
      phone: "",
      emergency_person_to_call: "",
      emergency_medical_care: "",
      emergency_known_allergy: ""
    }
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
  }

  private handleSaveClick = async () => {
    let id = await this.api.saveIdentity(sessionStorage.token, this.formData).toPromise();
    let ret = this.activatedRoute.snapshot.paramMap.get('ret');
    this.api.setIdToRetirement(sessionStorage.token, ret, id.body['id']).subscribe((data) => {
      if (data.ok) {
        window.location.href = "retirements";
      }
    });
  }

}
