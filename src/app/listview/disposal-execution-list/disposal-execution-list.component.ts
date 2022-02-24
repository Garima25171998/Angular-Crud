import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";

import {DisposalExecutionService} from 'src/app/service/disposal-execution.service'
@Component({
  selector: 'app-disposal-execution-list',
  templateUrl: './disposal-execution-list.component.html',
  styleUrls: ['./disposal-execution-list.component.css']
})
export class DisposalExecutionListComponent implements OnInit {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  constructor(private router:Router,private disposalexecution:DisposalExecutionService) { }

  public gridData: any;
  public gridView: any;

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getalldisposalexecution()
  }
  getalldisposalexecution(){
    this.disposalexecution.getalldisposalexecution().subscribe((data:any)=>{
      this.gridData=data.result
      this.gridView = data.result;
      console.log(data)
    })
  }

  handleEdit(id:any){
    console.log("edit clicked "+id)
    this.router.navigateByUrl('/edit-contact',{state:{id}})
  }

 
  

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
