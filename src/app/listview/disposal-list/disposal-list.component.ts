import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { DisposalserviceService } from 'src/app/service/disposalservice.service';
// import {data} from '../../kendoui-gridview/employees'

@Component({
  selector: 'app-disposal-list',
  templateUrl: './disposal-list.component.html',
  styleUrls: ['./disposal-list.component.css']
})
export class DisposalListComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(private router:Router,private disposal:DisposalserviceService) { }

  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getalldisposal()
  }
  getalldisposal(){
    this.disposal.getalldisposal().subscribe((data:any)=>{
      this.gridData=data.result
      this.gridView = data.result;
      console.log(data)
    })
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-contact',{state:{id}})
  }

  // handleDelete(id:any){

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.contact.deleteContact(id).subscribe((data:any)=>{
  //         if(data.status===200)
  //           Swal.fire(data.message, '', 'success')
  //         else if(data.status===500)
  //           Swal.fire(data.message, '', 'error')
  //           this.getAccounts()
  //       })
        
  //     }
  //   })
  // }


    // Swal.fire({
    //   title: 'Are You Sure?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Delete',
    //   // denyButtonText: `Don't save`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
        
    //   } else if (result.isDenied) {
    //     Swal.fire('Changes are not saved', '', 'info')
    //   }
    // })
  

  public onFilter(e: any): void {
    let inputValue=e.target.value
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "disposal_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "company_type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "disposal_company_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "mobile_no",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "email",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "first_name",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

}
