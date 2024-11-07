import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    ReactiveFormsModule
  ],
  providers: [
    CameraService
  ]
})
export class CamerasModule { }
