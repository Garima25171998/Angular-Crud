import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AllotmentService {
  constructor(private http: HttpClient) {}
  base_url = 'https://epr.troology.com/epr/po/';

  getPodataforallotment(data: any) {
    let api_url = this.base_url + 'getpowithmaterial';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getDisposal(data: any) {
    let api_url = this.base_url + 'getDisposal';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  AllotmentPO(data: any) {
    let api_url = this.base_url + 'updateachivedqty';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
