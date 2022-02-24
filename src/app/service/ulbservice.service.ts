import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UlbserviceService {
  base_url: any = 'https://epr.troology.com/epr/ulb/';
  constructor(private http: HttpClient) {}
  getallulb() {
    let api_url = this.base_url + 'getallulb';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  saveulb(data: any) {
    let api_url = this.base_url;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getulbbyid(id: any) {
    let api_url = this.base_url + 'getulbbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateulb(id:any,data: any) {
    let api_url = this.base_url + 'updateulbbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
