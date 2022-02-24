import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectioncenterserviceService {
  base_url: any = 'https://epr.troology.com/epr/collectioncenter'
  constructor(private http: HttpClient) {}
  getallcollection() {
    let api_url = this.base_url + '/getallcollectioncenter';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  saveccl(data: any) {
    let api_url = this.base_url;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }

  getcclbyid(id: any) {
    let api_url = this.base_url + '/getcollectioncenterbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  updateccl(id: any, data: any) {
    let api_url = this.base_url + '/updatetallcollectionbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
}
