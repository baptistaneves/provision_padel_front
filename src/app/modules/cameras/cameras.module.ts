import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'src/app/shared/shared.module';
import { CamerasComponent } from './list/cameras.component';
import { CameraRoutingModule } from './camera.routing.module';
import { CameraService } from './services/camera.service';



@NgModule({
  declarations: [
    CamerasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CameraRoutingModule,
    ModalModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    CameraService
  ]
})
export class CamerasModule { }
