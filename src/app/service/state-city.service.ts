import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateCityService {
  Apiurl = 'https://api.postalpincode.in/pincode/'
  constructor(private http:HttpClient) { }
 getstatecity(pincode:any){
  
    let url=this.Apiurl+pincode
    const httpOptions={
    headers:new HttpHeaders({
      'content-type':'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJvbS5zaGFrdGlAdHJvb2xvZ3kuY29tIiwiYXBpX3Rva2VuIjoibGxSYWE3X3BoZTYtS19tWUFtbThreTZWTmtDbTR4X052Z2ZKTTRLMHloaVd6SHJaTktrMHJfbmxNeDZYWmhRU2dqdyJ9LCJleHAiOjE2MzI4MDMwOTB9.MHxZ_nhkSw2n6bqOKpw5ybffHHzxQSyHqbDKEgchb3k'
    }),
  }
   return this.http.get(url)
 }
}
