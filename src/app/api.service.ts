import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private static readonly API_END_POINT = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { }

  users() {
    return this.http.get(APIService.API_END_POINT + "users",
      { observe: 'response' }
    );
  }

  login(email: string, password: string) {
    return this.http.post(APIService.API_END_POINT + "login", JSON.stringify({
      email: email,
      password: password
    }), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      observe: 'response'
    });
  }

  logout() {
    return this.http.get(APIService.API_END_POINT + "logout", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      observe: 'response'
    });
  }

  retreats(token: string) {
    return this.http.get(APIService.API_END_POINT + "retreats", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

  retreat(token: string, ret: string) {
    return this.http.get(APIService.API_END_POINT + "retreats/" + ret, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

  subscription(token: string, ret: string, id: string) {
    return this.http.post(APIService.API_END_POINT + "subscription", JSON.stringify({
      retreat_id: ret,
      identity_id: id
    }), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

  modify(token: string, ret:string, id: string, formData: Object) {
    return this.http.post(APIService.API_END_POINT + "modify", JSON.stringify({
      retreat_id: ret,
      identity_id: id,
      form_data: formData
    }), {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

}
