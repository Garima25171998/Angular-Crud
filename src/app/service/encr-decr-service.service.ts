import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncrDecrService {
  secretKey: any = '12345@#$ABC';
  constructor() {}
  //The set method is use for encrypt the value.
  set(value: any) {
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value.toString()),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(value: any) {
    var key = CryptoJS.enc.Utf8.parse(this.secretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretKey);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
