import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private http: HttpClient) {}
  base_url = 'https://epr.troology.com/epr/attachment';

  UploadFile(files: any,id:any) {
    let api_url = 'https://epr.troology.com/dt/upload';
    const formData = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept-Encoding': 'multipart/form-data',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    formData.append('image', files[0], files[0].name);
    formData.append("attachmentid",id);
    return this.http.post(api_url, formData, httpOptions);
  }

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
}
