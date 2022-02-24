import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisposalserviceService {

  base_url:any=" https://epr.troology.com/epr/disposal/"

  constructor(private http:HttpClient) { }
  submitForm(data: any) {
    let api_url = this.base_url;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getalldisposal(){
    let api_url=this.base_url+'getalldisposal'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    }
    return this.http.get(api_url,httpOptions)
  }
  updateForm(data: any,id:any) {
    let api_url = this.base_url+'updatedisposalbyid/'+id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url, data, httpOptions);
  }
  getDisposalById(id: any) {
    let api_url = this.base_url + 'getdisposalbyid/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }
}
