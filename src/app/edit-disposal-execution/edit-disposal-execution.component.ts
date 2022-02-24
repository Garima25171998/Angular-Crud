import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryStateCityService } from '../service/country-state-city.service';
import { StateCityService } from '../service/state-city.service';
import { TosterService } from '../service/toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { AttachmentService } from '../service/attachment.service';
import {DisposalExecutionService} from '../service/disposal-execution.service'
@Component({
  selector: 'app-edit-disposal-execution',
  templateUrl: './edit-disposal-execution.component.html',
  styleUrls: ['./edit-disposal-execution.component.css']
})
export class EditDisposalExecutionComponent implements OnInit {
  uniqid: any;
  disposalexecutionform!: FormGroup;
   login_id: any;
   statedata: any;
   districtdata: any;
   saveas: any;
   saveasnew: any;
   isValidFormSubmitted: any;
   isValidbutton: any;
   ccattachments: any = [];
   disposalexecutionformModal!: FormGroup;
   filedatainput: any;
   isValidbuttonModal: any;
   isValidFormSubmittedModal: any;
   @ViewChild('closebutton')
   closebutton: any;
   disexecutionId: any;
   disposalname: any;
   disposalid: any;
  
    constructor(
      private disposalexecution: DisposalExecutionService,
      private CountryStateCityService: CountryStateCityService,
      private cd: FormBuilder,
      private toast: TosterService,
      private Auth: AuthService,
      private Route: Router,
      private Attach: AttachmentService,
      private _Activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.disexecutionId =  this._Activatedroute.snapshot.paramMap.get('id');
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.CountryStateCityService.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });
    this.disposalexecution.getdisposalexecutionbyid(this.disexecutionId).subscribe((data: any) => {
      console.log(data.result[0]);
      this.forminit(data.result[0]);
      this.getdistrictonload(data.result[0].state);
       this.disposalid = data.result[0].disposal_id;
       this.disposalname = data.result[0].disposal_company_name;
      this.ccattachments =
        data.result[0].attachments == null
          ? this.ccattachments
          : data.result[0].attachments;
      console.log(this.ccattachments);
    });
    this.modalforminit();
  }
  get f() {
    return this.disposalexecutionform.controls;
  }

  get fm() {
    return this.disposalexecutionformModal.controls;
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
  forminit(disposalexecutiondata :any) {
    this.disposalexecutionform = this.cd.group({
    
      material_name:disposalexecutiondata.material_name,
      state: disposalexecutiondata.state,
      city: disposalexecutiondata.city,
      ulb:disposalexecutiondata.ulb,
      collection_center:disposalexecutiondata.collection_center,
      disposal_facility_pwpf:disposalexecutiondata.disposal_facility_pwpf,
      transporter_name:disposalexecutiondata.transporter_name,
      mobile_no:disposalexecutiondata.mobile_no,
      vehicle_no:disposalexecutiondata.vehicle_no,
      driver_name:disposalexecutiondata.driver_name,
      driver_mobile_no:disposalexecutiondata.driver_mobile_no,
      bill_t_no:disposalexecutiondata.bill_t_no,
      e_way_bill:disposalexecutiondata.e_way_bill,
      invoice_no:disposalexecutiondata.invoice_no,
      amount:disposalexecutiondata.amount,
      expenditure_type:disposalexecutiondata.expenditure_type,
      receipt_no:disposalexecutiondata.receipt_no,
      collection_date_time:disposalexecutiondata.collection_date_time,
      collection_material_weight:disposalexecutiondata.collection_material_weight,
      collection_remark:disposalexecutiondata.disposal_date_time,
      disposal_date_time:disposalexecutiondata.disposal_date_time,
      disposal_material_weight:disposalexecutiondata.disposal_material_weight,
      disposal_remark:disposalexecutiondata.disposal_remark,
      attachments:'',
    });
  }
  modalforminit() {
    this.disposalexecutionformModal = this.cd.group({
      type_id: this.uniqid,
      type: 'disposalexecution',
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
    if (this.disposalexecutionform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.disposalexecutionform.invalid) {
      console.log(this.disposalexecutionform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.disposalexecutionform, 'true');
      this.isValidbutton = true;
      this.disposalexecutionform.value.user_id = this.login_id;
      this.disposalexecutionform.value.attachments = this.ccattachments;
      this.disposalexecution.updateForm(this.disposalexecutionform.value,this.disexecutionId).subscribe((data:any) => {
        console.log(data);
        this.toast.showSuccess(
          'Congratulation!, Disposal execution has been Updated.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.Route.navigate(['/disposal-execution-list']);
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
    if (this.disposalexecutionformModal.invalid) {
      console.log(this.disposalexecutionformModal, 'error');
      this.isValidFormSubmittedModal = true;
      this.isValidbuttonModal = false;
    } else {
      console.log(this.disposalexecutionformModal, 'true');
      this.isValidbuttonModal = true;
      this.disposalexecutionformModal.value.image = this.filedatainput;
      this.disposalexecutionformModal.value.type_id = this.uniqid;
      this.disposalexecutionformModal.value.type = 'CC';
      let formadata = this.disposalexecutionformModal.value;
      this.Attach.submitForm(formadata).subscribe((data: any) => {
        this.ccattachments.push(data);
        console.log(this.ccattachments);
        this.toast.showSuccess('Attachment added.');
        this.disposalexecutionformModal.reset();
        this.closebutton.nativeElement.click();
        this.isValidbuttonModal = false;
      });
    }
  }
  getdistrictonload(state: any) {
    console.log(state);
    this.CountryStateCityService.getalldistrictwithstatewise({
      statename: state,
    }).subscribe((data: any) => {
      console.log(data);
      this.districtdata = data.result;
    });
  }
}
