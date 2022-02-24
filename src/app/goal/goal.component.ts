import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
})
export class GoalComponent implements OnInit {


  targetInfo: any = [
    {
      material_name: null,
      state: null,
      city: null,
      ulb: null,
      collection_center: null,
      disposal: null,
      collection_target: null,
      target_date: null,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
  addinfo(e: any) {
    e.preventDefault();
    this.targetInfo.push({
      material_name: null,
      state: null,
      city: null,
      ulb: null,
      collection_center: null,
      disposal: null,
      collection_target: null,
      target_date: null,
    });
    console.log(this.targetInfo);
  }
  deleteinfo(e: any, index: any) {
    e.preventDefault();
    this.targetInfo.splice(index, 1);
  }
  valueInsert(e: any, name: any, index: any) {
    this.targetInfo[index][name] = e.target.value;
  }



}
