import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoRoutingModule } from './videos.routing.module';
import { VideosComponent } from './videos/videos.component';
import { VideoService } from './services/video.service';



@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    VideoService
  ]
})
export class VideosModule { }
