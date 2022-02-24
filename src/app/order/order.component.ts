import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryStateCityService } from '../service/country-state-city.service';
import { StateCityService } from '../service/state-city.service';
import { TosterService } from '../service/toster.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AttachmentService } from '../service/attachment.service';
import { TranporterserviceService } from '../service/tranporterservice.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CustomerService } from '../service/customer.service';
import { PoService } from '../service/po.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  uniqid: any;
  POform!: FormGroup;
  login_id: any;
  statedata: any;
  districtdata: any;
  saveas: any;
  saveasnew: any;
  isValidFormSubmitted: any;
  isValidbutton: any;
  ccattachments: any = [];
  POformModal!: FormGroup;
  filedatainput: any;
  isValidbuttonModal: any;
  isValidFormSubmittedModal: any;
  @ViewChild('closebutton')
  closebutton: any;
  materialInfo: any = [];
  Customers: any = [];
  selectedItem: any = [];
  dropdownSettings: any = {};
  closeDropdownSelection = false;
  disabled = false;
  customerdata: any;
  customer_id: any;
  materialerror: any = [{ material_name :null,state:null,qty:0,targetdate:null,price:0}];
  materialstatus: any = false;
  constructor(
    private transporter: TranporterserviceService,
    private CountryStateCityService: CountryStateCityService,
    private op: FormBuilder,
    private toast: TosterService,
    private Auth: AuthService,
    private Route: Router,
    private Attach: AttachmentService,
    private Cust: CustomerService,
    private Porder:PoService
  ) {}

  ngOnInit(): void {
    this.uniqid = Math.floor(Math.random() * 100000);
    this.Auth.userLoggedIn().subscribe((logindata: any) => {
      // console.log(logindata);
      this.login_id = logindata.result._id;
    });
    this.Cust.getcustomer().subscribe((data: any) => {
      // console.log(data)
      this.Customers = data.result;
    });
    this.selectedItem = '';
    this.dropdownSettings = {
      idField: '_id',
      textField: 'organization_name',
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.CountryStateCityService.getallstates().subscribe((data: any) => {
      // console.log(data.result);
      this.statedata = data.result;
    });
    this.forminit();
    this.modalforminit();
    this.materialInfo.push({
      material_name: '',
      state: null,
      collection_Qty: 0,
      target_date: null,
      net_unit_price: 0,
      sub_total: 0,
    });
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.customer_id = item._id;
    this.Cust.getcustomerbyid(item._id).subscribe((cdata: any) => {
      console.log(cdata);
      this.customerdata = cdata.result[0];
    });
  }
  onchange(e: any, i: any, name: any) {
    if (e.target.value > 0) {
      this.materialInfo[i][name] = e.target.value;
      this.materialInfo[i].sub_total =
        parseInt(this.materialInfo[i].collection_Qty) *
        parseInt(this.materialInfo[i].net_unit_price);
    } else {
      this.materialInfo[i][name] = 0;
      this.materialInfo[i].sub_total =
        parseInt(this.materialInfo[i].collection_Qty) *
        parseInt(this.materialInfo[i].net_unit_price);
    }
    this.materialInfo.map((item: any, i: any) => {
      if (item.material_name == ''|| item.material_name == null )
       this.materialerror[i]['material_name'] =true
     else this.materialerror[i]['material_name'] = false;

     if ( item.state == '' || item.state == null )
       this.materialerror[i]['state'] = true;
     else this.materialerror[i]['state'] = false;

      if (item.collection_Qty == 0)
        this.materialerror[i]['qty'] = true;
      else this.materialerror[i]['qty'] = false;

      if (item.target_date == '' || item.target_date == null)
        this.materialerror[i]['targetdate'] = true;
      else this.materialerror[i]['targetdate'] = false;

      if (item.net_unit_price == 0)
        this.materialerror[i]['price'] = true;
      else this.materialerror[i]['price'] = false;
    })
  }

  onchangetext(e: any, i: any, name: any) {
    this.materialInfo[i][name] = e.target.value;
   this.materialInfo.map((item: any, i: any) => {
     if (item.material_name == ''|| item.material_name == null )
       this.materialerror[i]['material_name'] =true
     else this.materialerror[i]['material_name'] = false;

     if ( item.state == '' || item.state == null )
       this.materialerror[i]['state'] = true;
     else this.materialerror[i]['state'] = false;

      if (item.collection_Qty == 0)
        this.materialerror[i]['qty'] = true;
      else this.materialerror[i]['qty'] = false;

      if (item.target_date == '' || item.target_date == null)
        this.materialerror[i]['targetdate'] = true;
      else this.materialerror[i]['targetdate'] = false;

      if (item.net_unit_price == 0)
        this.materialerror[i]['price'] = true;
      else this.materialerror[i]['price'] = false;


   });
   console.log(this.materialerror);

  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      closeDropDownOnSelection: this.closeDropdownSelection,
    });
  }

  get f() {
    return this.POform.controls;
  }

  get fm() {
    return this.POformModal.controls;
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
    this.POform = this.op.group({
      PO_id: [this.uniqid, Validators.required],
      customer_id: '',
      materials: '',
      remark: '',
      attachments: '',
    });
  }

  modalforminit() {
    this.POformModal = this.op.group({
      type_id: this.uniqid,
      type: 'PO',
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
    if (this.POform.invalid) {
      this.saveas = true;
    } else {
      this.saveas = svalue;
    }
  }
  saveasnewform(savalue: any) {
    if (this.POform.invalid) {
      this.saveasnew = true;
    } else {
      this.saveas = savalue;
    }
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;

    if (this.POform.invalid) {
      console.log(this.POform, 'error');
      this.isValidFormSubmitted = true;
      this.isValidbutton = false;
      this.toast.showError('Sorry!, Fields are mandatory.');
    } else {
      console.log(this.POform, 'true');
      this.isValidbutton = true;
      this.POform.value.user_id = this.login_id;
      this.POform.value.attachments = this.ccattachments;
      this.POform.value.customer_id = this.customer_id;
      this.POform.value.materials = this.materialInfo;
      console.log(this.POform.value);
        this.Porder.saveulb(this.POform.value).subscribe((data) => {
          console.log(data);
          this.toast.showSuccess('Congratulation!, PO has been created.');
          if (this.saveas == 'save') {
            console.log(this.saveas);
            setTimeout(() => {
              this.Route.navigate(['/order-list']);
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
    if (this.POformModal.invalid) {
      console.log(this.POformModal, 'error');
      this.isValidFormSubmittedModal = true;
      this.isValidbuttonModal = false;
    } else {
      console.log(this.POformModal, 'true');
      this.isValidbuttonModal = true;
      this.POformModal.value.image = this.filedatainput;
      this.POformModal.value.type_id = this.uniqid;
      this.POformModal.value.type = 'PO';
      let formadata = this.POformModal.value;
      this.Attach.submitForm(formadata).subscribe((data: any) => {
        this.ccattachments.push(data);
        console.log(this.ccattachments);
        this.toast.showSuccess('Attachment added.');
        this.POformModal.reset();
        this.closebutton.nativeElement.click();
        this.isValidbuttonModal = false;
      });
    }
  }

  addinfo(e: any) {
    e.preventDefault();
    this.materialInfo.push({
      material_name: '',
      state: null,
      collection_Qty: 0,
      target_date: null,
      net_unit_price: 0,
      sub_total: 0,
    });
    this.materialerror.push({
      material_name: null,
      state: null,
      qty: 0,
      targetdate: null,
      price: 0,
    });
    console.log(this.materialInfo);
  }
  deleteinfo(e: any, index: any) {
    e.preventDefault();
    this.materialInfo.splice(index, 1);
    this.materialerror.splice(index, 1);
  }

  valueInsert(e: any, name: any, index: any) {
    this.materialInfo[index][name] = e.target.value;
  }
}
