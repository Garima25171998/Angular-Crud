import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }
  
  base_url="http://13.233.185.151:3000/epr"

  loginUser(data:any){
    let api_url=this.base_url+"/login"
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': 'MYR437Q-P9GM2KH-G9Y661H-37GZYWQ'
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  CheckEmail(email:any){
    let api_url=this.base_url+'/login/checkemail'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': 'MYR437Q-P9GM2KH-G9Y661H-37GZYWQ'
      }),
    }
    return this.http.post(api_url,email,httpOptions)
  }

  SendEmail(email:any){
    let api_url=this.base_url+'/login/sendmail'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': 'MYR437Q-P9GM2KH-G9Y661H-37GZYWQ'
      }),
    }
    return this.http.post(api_url,email,httpOptions)
  }

  VerifyEmail(data:any){
    let api_url=this.base_url+'/login/verify-otp'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': 'MYR437Q-P9GM2KH-G9Y661H-37GZYWQ'
      }),
    }
    return this.http.post(api_url,data,httpOptions)
  }

  userLoggedIn(){
    let email=localStorage.getItem('user')?localStorage.getItem('user'):this.router.navigate(['/login'])
    console.log(email)
    let api_url=this.base_url+'/login/get-user'
    const httpOptions={
      headers:new HttpHeaders({
        'content-type':'application/json;charset=UTF-8',
        'apikey': 'MYR437Q-P9GM2KH-G9Y661H-37GZYWQ'
      }),
    }
    return this.http.post(api_url,{email},httpOptions)
  }
}
