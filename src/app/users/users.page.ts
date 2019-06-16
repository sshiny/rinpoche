import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private users: Array<Object>;

  constructor(public api: APIService) {
    this.users = new Array();
  }

  ngOnInit() {
    this.api.users().subscribe((data) => {
      if (Array.isArray(data.body)) {
        data.body.forEach((val) => {
          this.users.push(val);
        });
      }
    });
  }

  private login = (email: string) => {
    sessionStorage.setItem("email", email);
    window.location.href = "pin";
  };

}
