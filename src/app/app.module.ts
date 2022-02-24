import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule ,HttpClientJsonpModule} from '@angular/common/http';
import { TreeListModule } from '@progress/kendo-angular-treelist';
import {ToastrModule } from 'ngx-toastr'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { EditService } from './service/edit.service';
import { SwiperModule } from 'swiper/angular';
import { DataTablesModule } from 'angular-datatables';

import {
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { CustomerComponent } from './customer/customer.component';
import { CollectionComponent } from './collection/collection.component';
import { ULBComponent } from './ulb/ulb.component';
import { DisposalComponent } from './disposal/disposal.component';
import { TransporterComponent } from './transporter/transporter.component';

import { OrderComponent } from './order/order.component';
import { DisposalExecutionComponent } from './disposal-execution/disposal-execution.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RoleComponent } from './role/role.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddroleComponent } from './addrole/addrole.component';
import { CustomerListComponent } from './listview/customer-list/customer-list.component';
import { MenusModule } from '@progress/kendo-angular-menu';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { GoalComponent } from './goal/goal.component';
import { DisposalListComponent } from './listview/disposal-list/disposal-list.component';
import { UlbListComponent } from './listview/ulb-list/ulb-list.component';
import { TransporterListComponent } from './listview/transporter-list/transporter-list.component';
import { CollectioncenterComponent } from './listview/collectioncenter/collectioncenter.component';
import { EditUlbComponent } from './edit-ulb/edit-ulb.component';
import { EditCollectioncenterComponent } from './edit-collectioncenter/edit-collectioncenter.component';
import { EditTransporterComponent } from './edit-transporter/edit-transporter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditDisposalComponent } from './edit-disposal/edit-disposal.component';
import { OrderListComponent } from './listview/order-list/order-list.component';
import { DisposalExecutionListComponent } from './listview/disposal-execution-list/disposal-execution-list.component';
import { EditDisposalExecutionComponent } from './edit-disposal-execution/edit-disposal-execution.component';
import { EncrDecrService } from '../app/service/encr-decr-service.service';
import { AllotmentComponent } from './allotment/allotment.component';
import { TargetListComponent } from './target-list/target-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CustomerComponent,
    CollectionComponent,
    ULBComponent,
    DisposalComponent,
    TransporterComponent,
    GoalComponent,
    OrderComponent,
    DisposalExecutionComponent,
    UserlistComponent,
    RoleComponent,
    AdduserComponent,
    AddroleComponent,
    CustomerListComponent,
    EditCustomerComponent,
    DisposalListComponent,
    UlbListComponent,
    TransporterListComponent,
    CollectioncenterComponent,
    EditUlbComponent,
    EditCollectioncenterComponent,
    EditTransporterComponent,
    EditDisposalComponent,
    OrderListComponent,
    DisposalExecutionListComponent,
    EditDisposalExecutionComponent,
    AllotmentComponent,
    TargetListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeListModule,
    HttpClientJsonpModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    GridModule,
    PDFModule,
    ExcelModule,
    ChartsModule,
    DialogModule,
    InputsModule,
    LabelModule,
    SwiperModule,
    MenusModule,
    DropDownsModule,
    DataTablesModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBF7EaxwTkcOgeBDMxLd6s6QzTVIdXakhM',
    //   libraries: ['places'],
    // }),
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
    EncrDecrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
