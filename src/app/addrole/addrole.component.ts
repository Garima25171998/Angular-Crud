import { Component, OnInit } from '@angular/core';

// import { AddroleComponent } from './addrole.component';
@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {
 
 
  customerbox=false;
  ulbCheckbox=false;
  collectionCheckbox=false;
  transporterCheckbox=false;
  disposalCheckbox=false;
  userCheckbox=false;
  roleCheckbox=false;
  constructor() { }
  PermissionsCheckbox = false;
  ngOnInit(): void {
  }
  toggleallVisibility(e:any){
    console.log(!e.target.checked)
    if(!e.target.checked){
      this.customerbox= false
    this.ulbCheckbox=false
    this.collectionCheckbox=false
    this.transporterCheckbox=false
    this.disposalCheckbox=false
    this.userCheckbox=false
    this.roleCheckbox=false

    }else{
      this.customerbox= true
      this.ulbCheckbox=true
      this.collectionCheckbox=true
      this.transporterCheckbox=true
      this.disposalCheckbox=true
      this.userCheckbox=true
      this.roleCheckbox=true
    }
    

  }
  toggleCustomerVisibility(e:any){
    this.customerbox= !this.customerbox
  }
  toggleUlbVisibility(e:any){
    this.ulbCheckbox=!this.ulbCheckbox
  }
  togglecollectionVisibilty(e:any){
    this.collectionCheckbox=!this.collectionCheckbox
  }
  toggleTransporterVisibilty(e:any){
    this.transporterCheckbox=!this.transporterCheckbox
  }
    
  toogleDisposalVisibilty(e:any){
    this.disposalCheckbox=!this.disposalCheckbox
  }
  toogleUserVisibilty(e:any){
    this.userCheckbox=!this.userCheckbox
  }
  toogleRoleVisibilty(e:any){
    this.roleCheckbox=!this.roleCheckbox
  }
  togglePermissionsVisibility(e:any){
    this.PermissionsCheckbox= !this.PermissionsCheckbox
  }
  
}
