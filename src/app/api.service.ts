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

  retreat(token: string, id: string) {
    return this.http.get(APIService.API_END_POINT + "retreats/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

  identity(token: string, id: string) {
    return this.http.get(APIService.API_END_POINT + "identities/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

}
