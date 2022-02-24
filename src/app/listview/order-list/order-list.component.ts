import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoService } from 'src/app/service/po.service';
import { EncrDecrService } from 'src/app/service/encr-decr-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @ViewChild('myModal')
  myModal!: { nativeElement: { className: string } };
  constructor(
    private router: Router,
    private order: PoService,
    private EncrDecr: EncrDecrService
  ) {}

  podata: any;
  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.getallpo();
    localStorage.setItem('allotment', '');
  }
  getallpo() {
    this.order.getallpo().subscribe((data: any) => {
      console.log(data.result);
      this.podata = data.result;
    });
  }

  handleEdit(id: any) {
    console.log('edit clicked ' + id);
    this.router.navigateByUrl('/edit-contact', { state: { id } });
  }

  getAllotment(POid: any, materialAllot: any, weight: any) {
    console.log(POid, materialAllot, weight);
    let allot = { POid: POid, materialAllot: materialAllot, weight: weight };
    // var encrypted = this.EncrDecr.set(allot);
    // console.log(encrypted)
    localStorage.setItem('allotment', JSON.stringify(allot));
    this.router.navigate(['./order-allotment', POid]);
  }
  convertintonumber(num: any) {
    return parseFloat(num);
  }
}

