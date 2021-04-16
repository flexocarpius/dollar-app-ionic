import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://dollar-web-app.herokuapp.com';

  constructor(private http: HttpClient) { }

  getWeeklyData() {
    return this.http.get(`${this.BASE_URL}/weekly/`);
  }

  getAllData() {
    return this.http.get(`${this.BASE_URL}/api/entries/`);
  }
}
