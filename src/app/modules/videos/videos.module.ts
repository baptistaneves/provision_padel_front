import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { VideoRoutingModule } from './videos.routing.module';
import { VideosComponent } from './videos/videos.component';
import { VideoService } from './services/video.service';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';



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
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    VideoService
  ]
})
export class VideosModule { }
