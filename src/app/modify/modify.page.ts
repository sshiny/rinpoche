import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils.service';
import { APIService } from '../api.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {

  private sub: Object;
  private formData: Object;

  private ret: string;
  private id: string;

  constructor(private activatedRoute: ActivatedRoute, public plt: Platform, public utils: UtilsService, public api: APIService) {
    this.formData = {
      identity: {
        address: "",
        zipcode: "",
        city: "",
        country: "",
        phone: "",
        emergency_person_to_call: "",
        emergency_medical_care: "",
        emergency_known_allergy: ""
      },
      notes: []
    };
    this.ret = this.activatedRoute.snapshot.paramMap.get('ret');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.utils.redirectToPinPage(this.plt);
    if (sessionStorage.retreat && sessionStorage.identity && sessionStorage.subscription) {
      if (sessionStorage.retreat == this.ret && sessionStorage.identity == this.id) {
        this.sub = JSON.parse(sessionStorage.subscription);
        this.setNotes(this.sub['notes']);
        return;
      }
    }
    this.api.subscription(sessionStorage.token, this.ret, this.id).subscribe((data) => {
      this.sub = data.body;
      this.setNotes(this.sub['notes']);
      sessionStorage.setItem("retreat", this.ret);
      sessionStorage.setItem("identity", this.id);
      sessionStorage.setItem("subscription", JSON.stringify(data.body));
    });
  }

  private setNotes = (notes: Array<Object>) => {
    notes.forEach((idx, val) => {
      this.formData['notes'].push({ title: "", content: "" });
    });
  };

  private cleanData = (obj: Object) => {
    const o = JSON.parse(JSON.stringify(obj));
    Object.keys(o).forEach((key) => {
      if (o[key] && typeof o[key] === "object") {
        o[key] = this.cleanData(o[key]);
        if (Object.keys(o[key]).length <= 0) {
          delete o[key];
        }
      } else if (o[key] === "" || Array.isArray(o[key]) && o[key].length === 0) {
        delete o[key];
      } else {
        o[key] = o[key];
      }
    });
    return o;
  };

  private mergeData = (src: Object, dst: Object) => {
    const o = {};
    Object.keys(src).forEach((key) => {
        if (src.hasOwnProperty(key) && dst.hasOwnProperty(key)) {
          if (typeof src[key] === "object" && typeof dst[key] === "object") {
            o[key] = {...dst[key], ...src[key]};
          }
        }
    });
    return o;
  };

  private handleModifyClick = () => {
    let data = this.cleanData(this.formData);
    this.api.modify(sessionStorage.token, this.ret, this.id, data).subscribe((res) => {
      if (res.ok) {
        let merged = Object.assign(this.sub, this.mergeData(data, this.sub));
        sessionStorage.setItem("subscription", JSON.stringify(merged));
        location.reload();
      }
    });
  };

}
