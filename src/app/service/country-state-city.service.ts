import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryStateCityService {
  constructor(private http: HttpClient) {}

  getStates(country: any) {
    let api_url = 'https://www.universal-tutorial.com/api/states/' + country;

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJvbS5zaGFrdGlAdHJvb2xvZ3kuY29tIiwiYXBpX3Rva2VuIjoibGxSYWE3X3BoZTYtS19tWUFtbThreTZWTmtDbTR4X052Z2ZKTTRLMHloaVd6SHJaTktrMHJfbmxNeDZYWmhRU2dqdyJ9LCJleHAiOjE2MzI4MDMwOTB9.MHxZ_nhkSw2n6bqOKpw5ybffHHzxQSyHqbDKEgchb3k',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getCity(state: any) {
    let api_url = 'https://www.universal-tutorial.com/api/cities/' + state;

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJvbS5zaGFrdGlAdHJvb2xvZ3kuY29tIiwiYXBpX3Rva2VuIjoibGxSYWE3X3BoZTYtS19tWUFtbThreTZWTmtDbTR4X052Z2ZKTTRLMHloaVd6SHJaTktrMHJfbmxNeDZYWmhRU2dqdyJ9LCJleHAiOjE2MzI4MDMwOTB9.MHxZ_nhkSw2n6bqOKpw5ybffHHzxQSyHqbDKEgchb3k',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getallstates() {
    let api_url = 'https://epr.troology.com/epr/ulb/states';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.get(api_url, httpOptions);
  }

  getalldistrictwithstatewise(statename:any) {
    let api_url = 'https://epr.troology.com/epr/ulb/district';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=UTF-8',
        apikey: '8GWF6J1-WVG40Q4-HBWGNVY-9VXTXQ8',
      }),
    };
    return this.http.post(api_url,statename, httpOptions);
  }
}
