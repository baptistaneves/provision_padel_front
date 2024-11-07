import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourtsComponent } from './courts/courts.component';
import { CourtRoutingModule } from './courts.routing.module';
import { CourtService } from './services/court.service';

@NgModule({
  declarations: [
    CourtsComponent
  ],
  imports: [
    CommonModule,
    CourtRoutingModule,
    SharedModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CourtService
  ]
})
export class CourtsModule { }