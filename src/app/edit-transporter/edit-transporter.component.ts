import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryStateCityService } from '../service/country-state-city.service';
import { StateCityService } from '../service/state-city.service';
import { TosterService } from '../service/toster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AttachmentService } from '../service/attachment.service';
import { TranporterserviceService } from '../service/tranporterservice.service';


@Component({
  selector: 'app-edit-transporter',
  templateUrl: './edit-transporter.component.html',
  styleUrls: ['./edit-transporter.component.css'],
})
export class EditTransporterComponent implements OnInit {
  uniqid: any;
  transporterform!: FormGroup;
  login_id: any;
  statedata: any;
  districtdata: any;
  saveas: any;
  saveasnew: any;
  isValidFormSubmitted: any;
  isValidbutton: any;
  ccattachments: any = [];
  transporterformModal!: FormGroup;
  filedatainput: any;
  isValidbuttonModal: any;
  isValidFormSubmittedModal: any;
  @ViewChild('closebutton')
  closebutton: any;
  transId: any;
  transname: any;
  transportid: any;
  constructor(
    private transporter: TranporterserviceService,
    private CountryStateCityService: CountryStateCityService,
    private tp: FormBuilder,
    private toast: TosterService,
    private Auth: AuthService,
    private Route: Router,
    private Attach: AttachmentService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.transId = this._Activatedroute.snapshot.paramMap.get('id');
    this.uniqid = Math.floor(Math.random() * 100000);
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.CountryStateCityService.getallstates().subscribe((data: any) => {
      console.log(data.result);
      this.statedata = data.result;
    });

    this.transporter.getTransporterById(this.transId).subscribe((data: any) => {
      console.log(data.result[0]);
      this.forminit(data.result[0]);
      this.getdistrictonload(data.result[0].state);
       this.transportid = data.result[0].transporter_id;
       this.transname = data.result[0].transporter_name;
      this.ccattachments =
        data.result[0].attachments == null
          ? this.ccattachments
          : data.result[0].attachments;
      console.log(this.ccattachments);
    });

    this.modalforminit();
  }

  get f() {
    return this.transporterform.controls;
  }

  get fm() {
    return this.transporterformModal.controls;
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

  forminit(transdata: any) {
    this.transporterform = this.tp.group({
      transporter_id: [transdata.transporter_id, Validators.required],
      transporter_name: [transdata.transporter_name, Validators.required],
      gstin: [
        transdata.gstin,
        Validators.pattern(
          '^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5}[0-9]{4}[A-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$'
        ),
      ],
      pan: [transdata.pan, [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      state: [transdata.state, Validators.required],
      city: [transdata.city, Validators.required],
      address: transdata.address,
      latitude: transdata.latitude,
      longitude: transdata.longitude,
      town_name: transdata.town_name,
      title: transdata.title,
      first_name: transdata.first_name,
      last_name: transdata.last_name,
      phone: transdata.phone,
      mobile: transdata.mobile,
      email: transdata.email,
      bank_name: transdata.bank_name,
      account_no: transdata.account_no,
      ifsc_code: transdata.ifsc_code,
      branch: transdata.branch,
      remark: transdata.remark,
      attachments: '',
    });
  }

  modalforminit() {
    this.transporterformModal = this.tp.group({
      type_id: this.uniqid,
      type: 'Trans',
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
    if (this.transporterform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  saveasnewform(savalue: any) {
    if (this.transporterform.invalid) {
      this.saveasnew = true;
    } else {
      this.saveas = savalue;
    }
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.transporterform.invalid) {
      console.log(this.transporterform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.transporterform, 'true');
      this.isValidbutton = true;
      this.transporterform.value.user_id = this.login_id;
      this.transporterform.value.attachments = this.ccattachments;
      this.transporter
        .updateForm(this.transporterform.value, this.transId)
        .subscribe((data) => {
          console.log(data);
          this.toast.showSuccess(
            'Congratulation!, Transporter has been Updated.'
          );
          if (this.saveas == 'save') {
            console.log(this.saveas);
            setTimeout(() => {
              this.Route.navigate(['/transporter-list']);
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
    if (this.transporterformModal.invalid) {
      console.log(this.transporterformModal, 'error');
      this.isValidFormSubmittedModal = true;
      this.isValidbuttonModal = false;
    } else {
      console.log(this.transporterformModal, 'true');
      this.isValidbuttonModal = true;
      this.transporterformModal.value.image = this.filedatainput;
      this.transporterformModal.value.type_id = this.uniqid;
      this.transporterformModal.value.type = 'CC';
      let formadata = this.transporterformModal.value;
      this.Attach.submitForm(formadata).subscribe((data: any) => {
        this.ccattachments.push(data);
        console.log(this.ccattachments);
        this.toast.showSuccess('Attachment added.');
        this.transporterformModal.reset();
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
