import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  call() {
    return this.http.get("http://127.0.0.1:8000/api/hello", { observe: 'response' });
  }
}
