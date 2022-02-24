import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryStateCityService } from '../service/country-state-city.service';
import { StateCityService } from '../service/state-city.service';
import { TosterService } from '../service/toster.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UlbserviceService } from '../service/ulbservice.service';
import { CollectioncenterserviceService } from '../service/collectioncenterservice.service';
import { AttachmentService } from '../service/attachment.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  collectionform!: FormGroup;
  collectionformModal!: FormGroup;
  statedata: any = [];
  uniqueId: any;
  saveas: any = true;
  saveasnew: any = true;
  isValidFormSubmitted: any;
  isValidbutton: any;
  isValidFormSubmittedModal: any;
  isValidbuttonModal: any;
  allowedExtensions = ['csv', 'xls'];
  districtdata: any;
  login_id: any;
  ulbdata: any;
  @ViewChild('closebutton')
  closebutton: any;
  ccattachments: any = [];
  filedatainput: any;
  constructor(
    private CountryStateCityService: CountryStateCityService,
    private ulb: FormBuilder,
    private ulbservice: UlbserviceService,
    private toast: TosterService,
    private Auth: AuthService,
    private Route: Router,
    private Cceneter: CollectioncenterserviceService,
    private Attach: AttachmentService
  ) {}

  ngOnInit(): void {
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.CountryStateCityService.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });
    this.ulbservice.getallulb().subscribe((data: any) => {
      console.log(data.result);

      this.ulbdata = data.result;
    });
    this.uniqueId = Math.random() * 100000;
    this.uniqueId = Math.floor(this.uniqueId);
    this.forminit(this.uniqueId);
    this.modalforminit();
  }
  get f() {
    return this.collectionform.controls;
  }

  get fm() {
    return this.collectionformModal.controls;
  }
  fileupload(e: any) {
    console.log(e.target.files[0].type);
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'image/png' ||
      e.target.files[0].type == 'image/jpeg' ||
      e.target.files[0].type == 'image/jpg'
    ) {
      this.Attach.UploadFile(e.target.files, this.uniqueId).subscribe(
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
  forminit(ccid: any) {
    this.collectionform = this.ulb.group({
      collection_center_id: [ccid, Validators.required],
      collection_center_name: ['', Validators.required],
      collection_type: ['', Validators.required],
      alias_name: '',
      collection_state: ['', Validators.required],
      collection_district: ['', Validators.required],
      address: [''],
      collection_ulb: [''],
      type_collection_center: ['', Validators.required],
      latitude: '',
      longitude: '',
      title: '',
      first_name: '',
      last_name: '',
      phone: '',
      mobile: '',
      email: '',
      monthly_qty_mlp: '',
      population: '',
      remark: '',
      attachments:''
    });
  }

  modalforminit() {
    this.collectionformModal = this.ulb.group({
      type_id: this.uniqueId,
      type: 'CC',
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

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.collectionform.invalid) {
      console.log(this.collectionform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.collectionform, 'true');
      this.isValidbutton = true;
      this.collectionform.value.user_id = this.login_id;
      this.collectionform.value.attachments = this.ccattachments
      this.Cceneter.saveccl(this.collectionform.value).subscribe((data) => {
        console.log(data);
        this.toast.showSuccess(
          'Congratulation!, Collection center has been created.'
        );
        if (this.saveas == 'save') {
          console.log(this.saveas);
          setTimeout(() => {
            this.Route.navigate(['/collectioncenter-list']);
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
    if (this.collectionformModal.invalid) {
      console.log(this.collectionformModal, 'error');
      this.isValidFormSubmittedModal = true;
      this.isValidbuttonModal = false;
    } else {
      console.log(this.collectionformModal, 'true');
      this.isValidbuttonModal = true;
      this.collectionformModal.value.image = this.filedatainput;
      this.collectionformModal.value.type_id = this.uniqueId;
      this.collectionformModal.value.type = 'CC';
      let formadata = this.collectionformModal.value;
      this.Attach.submitForm(formadata).subscribe((data: any) => {
        this.ccattachments.push(data);
        console.log(this.ccattachments);
        this.toast.showSuccess('Attachment added.');
        this.collectionformModal.reset();
        this.closebutton.nativeElement.click();
        this.isValidbuttonModal = false;
      });
    }
  }


  saveform(svalue: any) {
    if (this.collectionform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  saveasnewform(savalue: any) {
    if (this.collectionform.invalid) {
      this.saveasnew = true;
    } else {
      this.saveas = savalue;
    }
  }
}
