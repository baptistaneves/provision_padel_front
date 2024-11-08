import { Component, ElementRef, ViewChild } from '@angular/core';
import { Video } from '../models/video';
import { ToastrService } from 'ngx-toastr';

import {VgApiService} from '@videogular/ngx-videogular/core';

import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent {
 
  breadCrumbItems!: Array<{}>;

  errors: any[] = [];
  videos: Video[] = [];
  video: Video;

  preload: string = 'auto';
  api: VgApiService = new VgApiService();

  fileName:string;
  onlyFileName:string;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService) {
      this.fileName = '';
    }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Vídeos', active: true }
    ];

    this.listVideos();
  }

  listVideos() {
    this.videoService.getAll()
          .subscribe(
            response =>{
              this.videos = response;
            },
            errors => { this.handleFail(errors); }
          )
  }

  onPlayerReady(source: VgApiService) {
    this.api = source;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.autoplay.bind(this)
    )
  }

  autoplay() {
    this.api.play();
  }

  rewindVideo(seconds: number) {
    this.api.playbackRate = 2;
  }

  onSelectedVideo(fileName: string) {
    this.onlyFileName = fileName;
    this.fileName = `${this.videoService.UrlServiceV1}video/get-video/${fileName}`;
  }

  closeVideo() {
    this.fileName = '';
  }

  extractTheLast30Seconds(fileName: string): void {
    this.videoService.extractTheLast30Seconds(fileName).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}_last30seconds.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  formatSize(sizeInBytes: string): string {

    const size = parseInt(sizeInBytes, 10);

    const sizeInMB = size / (1024 * 1024);
    if (sizeInMB >= 1024) {
        const sizeInGB = sizeInMB / 1024;
        return `${sizeInGB.toFixed(2)} GB`;
    }
    return `${sizeInMB.toFixed(2)} MB`;
  }

}