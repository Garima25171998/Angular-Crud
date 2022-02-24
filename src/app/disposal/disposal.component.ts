import { Component, OnInit , ViewChild } from '@angular/core';
import { DisposalserviceService } from '../service/disposalservice.service'

import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { CountryStateCityService } from '../service/country-state-city.service';
import { StateCityService } from '../service/state-city.service';
import { TosterService } from '../service/toster.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AttachmentService } from '../service/attachment.service';

@Component({
  selector: 'app-disposal',
  templateUrl: './disposal.component.html',
  styleUrls: ['./disposal.component.css']
})
export class DisposalComponent implements OnInit {
  uniqid: any;
  disposalform!: FormGroup;
  login_id: any;
  statedata: any;
  districtdata: any;
  saveas: any;
  saveasnew: any;
  isValidFormSubmitted: any;
  isValidbutton: any;
  ccattachments: any = [];
  disposalformModal!: FormGroup;
  filedatainput: any;
  isValidbuttonModal: any;
  isValidFormSubmittedModal: any;
  @ViewChild('closebutton')
  closebutton: any;
  constructor(
    private disposal: DisposalserviceService,
    private CountryStateCityService: CountryStateCityService,
    private tp: FormBuilder,
    private toast: TosterService,
    private Auth: AuthService,
    private Route: Router,
    private Attach: AttachmentService
  ) { }

  ngOnInit(): void {
    this.uniqid = Math.floor(Math.random() * 100000);
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.CountryStateCityService.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });
    this.forminit();
    this.modalforminit();
  }

  get f() {
    return this.disposalform.controls;
  }

  get fm() {
    return this.disposalformModal.controls;
  }
  fileupload(e: any) {
    console.log(e.target.files[0].type);
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'image/png' ||
      e.target.files[0].type == 'image/jpeg' ||
      e.target.files[0].type == 'image/jpg'
    ) {
      this.Attach.UploadFile(e.target.files, this.uniqid).subscribe(
        (imagedata: any) => {
          console.log(imagedata);
          this.filedatainput = imagedata.url;
          this.isValidbuttonModal = false;
        }
      );
    } else {
      this.filedatainput = null;
      this.toast.showError('Invalid File.');
      this.isValidbuttonModal = true;
    }
  }
  forminit() {
    this.disposalform = this.tp.group({
      disposal_id: [this.uniqid, Validators.required],
      disposal_company_name: ['', Validators.required],
      gstin: [
        '',
        Validators.pattern(
          '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$'
        ),
      ],
      company_type:'',
      plant_name:'',
      alias_name:'',
      // pan: ['', [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: '',
      latitude: '',
      longitude: '',
      town:'',
      
      title: '',
      first_name: '',
      last_name: '',
      phone: '',
      mobile: '',
      email: '',
      monthly_qty_mlp: '',
      population: '',
      
      attachments: '',
    });
  }
  modalforminit() {
    this.disposalformModal = this.tp.group({
      type_id: this.uniqid,
      type: 'disposal',
      document_type: ['', Validators.required],
      document_no: ['', Validators.required],
      image: ['', Validators.required],
      validity: ['', Validators.required],
    });
  }

  getdistrict(e: any) {
    console.log(e.target.value);
    this.CountryStateCityService.getalldistrictwithstatewise({
      statename: e.target.value,
    }).subscribe((data: any) => {
      console.log(data);
      this.districtdata = data.result;
    });
  }
  saveform(svalue: any) {
    if (this.disposalform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  saveasnewform(savalue: any) {
    if (this.disposalform.invalid) {
      this.saveasnew = true;
    } else {
      this.saveas = savalue;
    }
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.disposalform.invalid) {
      console.log(this.disposalform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.disposalform, 'true');
      this.isValidbutton = true;
      this.disposalform.value.user_id = this.login_id;
      this.disposalform.value.attachments = this.ccattachments;
      this.disposal.submitForm(this.disposalform.value).subscribe((data) => {
        console.log(data);
        this.toast.showSuccess(
          'Congratulation!, Disposal has been created.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.Route.navigate(['/disposal-list']);
          }, 5000);
        } else {
          console.log(this.saveas);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      });
    }
  }
  onModalFormSubmit() {
    this.isValidFormSubmittedModal = false;
    if (this.disposalformModal.invalid) {
      console.log(this.disposalformModal, 'error');
      this.isValidFormSubmittedModal = true;
      this.isValidbuttonModal = false;
    } else {
      console.log(this.disposalformModal, 'true');
      this.isValidbuttonModal = true;
      this.disposalformModal.value.image = this.filedatainput;
      this.disposalformModal.value.type_id = this.uniqid;
      this.disposalformModal.value.type = 'CC';
      let formadata = this.disposalformModal.value;
      this.Attach.submitForm(formadata).subscribe((data: any) => {
        this.ccattachments.push(data);
        console.log(this.ccattachments);
        this.toast.showSuccess('Attachment added.');
        this.disposalformModal.reset();
        this.closebutton.nativeElement.click();
        this.isValidbuttonModal = false;
      });
    }
  }
 
}
