import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';


import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
// import {data} from '../../kendoui-gridview/employees'

import { CollectioncenterserviceService } from 'src/app/service/collectioncenterservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collectioncenter',
  templateUrl: './collectioncenter.component.html',
  styleUrls: ['./collectioncenter.component.css']
})
export class CollectioncenterComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(private router:Router,private collectoncenter :CollectioncenterserviceService) { }

  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getallcollection()
  }
  getallcollection(){
    this.collectoncenter.getallcollection().subscribe((data:any)=>{
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
            field: "collection_center_id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "collection_center_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "type_collection_center",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "collection_type",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "collection_state",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "collection_district",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "first_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "mobile",
            operator: "contains",
            value: inputValue,
          },{
            field: "email",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

}
